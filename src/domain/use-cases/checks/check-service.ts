import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";


interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback,
    ) {}

    async execute( url: string ): Promise<boolean> {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            this.successCallback && this.successCallback();
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.HIGH,
                origin: __filename
            });
            this.logRepository.saveLog(log);
            return true;
        } catch(error) {
            this.errorCallback && this.errorCallback(`${error}`);
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.HIGH,
                origin: __filename
            });
            this.logRepository.saveLog(log);
            return false;
        }

    }

}
