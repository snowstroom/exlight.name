import { Injectable } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: Transporter;
    constructor() {
        this.transporter = createTransport();
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
