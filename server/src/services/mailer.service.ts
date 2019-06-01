import { Injectable } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions, createTestAccount } from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: Transporter;
    constructor() {
        this.initMailer();
    }

    private async initMailer() {
        const testAccount = await createTestAccount();
        this.transporter = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
    }

    public async confirmRegistration(data: SendMailOptions): Promise<boolean> {
        try {
            await this.transporter.sendMail(data);
            return false;
        } catch (error) {
            return false;
        }
    }
}
