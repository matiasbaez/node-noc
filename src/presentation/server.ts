import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEMailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasouce";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const logRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
);

const emailService = new EmailService();

export class Server {

    public static start() {

        // Send mail
        new SendEMailLogs(
            emailService,
            fileSystemRepository
        ).execute(
            "matiasbaez2512@gmail.com"
        );

        emailService.sendEmail({
            to: "matiasbaez2512@gmail.com",
            subject: "Logs de sistema",
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>Labore veniam voluptate amet aliquip ex culpa ex.</p>
            `,
        });

        emailService.sendEmailWithFSLogs("matiasbaez2512@gmail.com");

        // Use the file system logger
        CronService.createJob(
            '*/10 * * * * *',
            () => {
                new CheckService(
                    fileSystemRepository,
                    () => console.log(`url is ok`),
                    (error) => console.error(error),
                ).execute('http://localhost:3000');
            }
        );

        // Use mongo db to log
        CronService.createJob(
            '*/10 * * * * *',
            () => {
                new CheckService(
                    logRepository,
                    () => console.log(`url is ok`),
                    (error) => console.error(error),
                ).execute('http://localhost:3000');
            }
        );

    }

}
