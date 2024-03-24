
import { createTransport } from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
};

interface Attachment {
    path: string;
    filename: string;
}

export class EmailService {

    private transporter = createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try {

            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFSLogs(to: string | string[]) {
        const subject = "Logs del servidor";
        const htmlBody = `
                <h3>Logs de sistema - NOC</h3>
                <p>Labore veniam voluptate amet aliquip ex culpa ex.</p>
            `;

        const attachments: Attachment[] = [
            { filename: "logs-low.log", path: "./logs/logs-low.log" },
            { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
            { filename: "logs-high.log", path: "./logs/logs-high.log" },
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        });
    }

}
