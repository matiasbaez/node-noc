
export enum LogSeverityLevel {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    // constructor(message: string, level: LogSeverityLevel) {
    //     this.level = level;
    //     this.message = message;
    //     this.createdAt = new Date();
    // }

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.level = level;
        this.origin = origin;
        this.message = message;
        this.createdAt = createdAt;
    }

    static fromJSON(jsonObject: string): LogEntity {
        const { message, level, createdAt, origin } = JSON.parse(jsonObject);

        if (!message) throw new Error("message is required");
        if (!level) throw new Error("level is required");

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });

        return log;
    }

}
