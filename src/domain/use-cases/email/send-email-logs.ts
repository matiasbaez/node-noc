import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEMailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {}

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFSLogs(to);
            if (!sent) throw new Error("Failed to send logs by e-mail");

            const log = new LogEntity({
                message: `Log sended by email`,
                level: LogSeverityLevel.LOW,
                origin: __filename
            });
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
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
