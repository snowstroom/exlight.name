import { Injectable } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions, createTestAccount } from 'nodemailer';
import { compile } from 'handlebars';
import { FileService } from './file.service';

@Injectable()
export class MailerService {
    private readonly TEMPLATES_DIR = __dirname.split('/').slice(0, -1).concat(['templates']).join('/');
    private transporter: Transporter;
    private templates = new Map<string, any>();
    constructor(private readonly fileSrv: FileService) {
        this.initMailer();
        this.loadTemplates();
    }

    private async initMailer() {
        this.transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSOWRD,
            },
        });
    }

    private async loadTemplates(): Promise<void> {
        const filesNames = await this.fileSrv.readDir(this.TEMPLATES_DIR);
        const pFilesData = filesNames.map(f => this.fileSrv.readFile(`${this.TEMPLATES_DIR}/${f}`));
        const filesData = await Promise.all(pFilesData);
        filesData.forEach((d, idx) =>
            this.templates.set(filesNames[idx], compile(d.toString())));
    }

    public async confirmReg(email: string): Promise<boolean> {
        try {
            const tempalte = this.templates.get('welcome.hbs');
            const mail = tempalte({
                domain: 'test',
                adminEmail: 'only_exlight@gmail.com',
                link: 'https://vk.com',
                disableLink: 'https://vk.com',
            });
            const option: SendMailOptions = {
                to: email,
                from: 'eXlight.name',
                priority: 'normal',
                subject: 'Спаисбо за регистрацию на exlight.name',
                html: mail,
            };
            await this.transporter.sendMail(option);
            return true;
        } catch (error) {
            // console.warn(error);
            return false;
        }
    }

    public async sendForgotMail(email: string): Promise<boolean> {
        try {
            const option: SendMailOptions = {
                to: email,
            };
            await this.transporter.sendMail(option);
            return true;
        } catch (error) {
            return false;
        }
    }
}
