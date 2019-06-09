import { Controller, Post, Body, Inject, HttpException, HttpStatus, HttpCode, Get, Param } from '@nestjs/common';
import { IUser, User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { MD5 } from 'crypto-js';
import { USER } from '../../consts/provider-names';
import { ExError } from 'src/classes/err';
import { AuthService } from 'src/services/auth.service';
import { MailerService } from 'src/services/mailer.service';

@Controller('/api/auth/')
export class AuthController {
    constructor(
        @Inject(USER) private userRep: Repository<User>,
        private authSrv: AuthService,
        private mailSrv: MailerService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    public async userAuth(@Body() user: IUser) {
        try {
            user.password = MD5(user.password).toString();
            const res = await this.userRep.findOne(user);
            if (res) {
                const token = await this.authSrv.signIn({
                    id: res.id,
                    email: res.email,
                    roleId: res.roleId,
                });
                return token;
            } else {
                throw new ExError('User not found or password not true');
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/refresh')
    public updateToken() {
        return;
    }

    @Post('/registration')
    public async userRigistr(@Body() user: Partial<IUser>) {
        try {
            const userData: Partial<IUser> = {
                email: user.email,
                password: MD5(user.password).toString(),
                roleId: 1, // TODO
            };
            await this.userRep.insert(userData);
            await this.mailSrv.confirmReg(user.email);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/forgot/:email')
    public async forgotPsw(@Param() params: any): Promise<void> {
        try {
            const { email } = params;
            const usr = this.userRep.findOne({ where: { email }});
            if (usr) {
                await this.mailSrv.sendForgotMail(email);
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
