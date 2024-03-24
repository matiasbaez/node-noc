import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = "logs/";
    private readonly allLogsPath = "logs-low.log";
    private readonly mediumLogsPath = "logs-medium.log";
    private readonly highLogsPath = "logs-high.log";

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath]
        .forEach(path => {
            const finalPath = `${this.logPath}${path}`;
            const fileExists = fs.existsSync(finalPath);
            if (!fileExists) {
                fs.writeFileSync(finalPath, '');
            }
        })
    }

    async saveLog(log: LogEntity): Promise<void> {
        const formattedLog = `${JSON.stringify(log)}\n`;
        fs.appendFileSync(`${this.logPath}${this.allLogsPath}`, formattedLog);

        if (log.level === LogSeverityLevel.LOW) return;
        if (log.level === LogSeverityLevel.MEDIUM) {
            fs.appendFileSync(`${this.logPath}${this.mediumLogsPath}`, formattedLog);
            return;
        }
        fs.appendFileSync(`${this.logPath}${this.highLogsPath}`, formattedLog);
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(`${this.logPath}${path}`, 'utf-8');
        if (content === "") return [];
        return content.split(/\n/).map(log => LogEntity.fromJSON(log));
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.LOW:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}