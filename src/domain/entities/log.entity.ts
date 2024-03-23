
export enum LogSeverityLevel {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJSON(jsonObject: string): LogEntity {
        const { message, level, createdAt } = JSON.parse(jsonObject);

        if (!message) throw new Error("message is required");
        if (!level) throw new Error("level is required");

        const log = new LogEntity(message, level);
        log.createdAt =  createdAt ? new Date(createdAt) : log.createdAt;

        return log;
    }

}
