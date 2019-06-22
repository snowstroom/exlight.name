import { Controller, Post, Body, Inject, HttpException, HttpStatus, HttpCode, Get, Param, Req, Query } from '@nestjs/common';
import { User } from 'server/src/models/user.model';
import { Repository } from 'typeorm';
import { MD5 } from 'crypto-js';
import { USER, ACCESS } from '../../consts/provider-names';
import { ExError } from 'server/src/classes/err';
import { AuthService } from 'server/src/services/auth.service';
import { MailerService } from 'server/src/services/mailer.service';
import { RolesAccesService } from 'server/src/services/roles-access.service';
import { AES, enc } from 'crypto-js';
import { Access } from 'server/src/models/access.model';
import { UserNamespace } from 'share';

@Controller('/api/auth')
export class AuthController {
    constructor(
        @Inject(USER) private userRep: Repository<User>,
        @Inject(ACCESS) private accessRep: Repository<Access>,
        private authSrv: AuthService,
        private mailSrv: MailerService,
        private roleSrv: RolesAccesService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    public async userAuth(@Body() user: UserNamespace.IUser) {
        try {
            user.password = MD5(user.password).toString();
            const res = await this.userRep.findOne();
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
    public async userRigistr(@Body() user: Partial<UserNamespace.IUser>) {
        try {
            const existUser = await this.userRep.findOne({
                where: { email: user.email },
            });
            if (!existUser) {
                const userData: Partial<UserNamespace.IUser> = {
                    email: user.email,
                    password: MD5(user.password).toString(),
                    roleId: this.roleSrv.defRole.id,
                };
                await this.userRep.insert(userData);
                await this.mailSrv.confirmReg(user.email);
                return;
            } else {
                throw new Error('User exist');
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/confirm/email')
    public async confirmEmail(@Query() params: any): Promise<any> {
        try {
            const email = AES.decrypt(params.hash, process.env.JWT_SECRET_KEY).toString(enc.Utf8);
            const user = await this.userRep.findOne({ where: { email } });
            if (user) {
                await this.userRep.update(user.id, {
                    ...user,
                    roleId: this.roleSrv.defConfirmRole.id,
                });
                return;
            } else {
                return new HttpException({ error: 'Email not found'}, HttpStatus.BAD_REQUEST);
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/disable/email')
    public async disableEmail(@Query() params: any): Promise<any> {
        try {
            const email = AES.decrypt(params.hash, process.env.JWT_SECRET_KEY).toString(enc.Utf8);
            const user = await this.userRep.findOne({ where: { email } });
            if (user.roleId === this.roleSrv.defRole.id) {
                await this.userRep.delete({ email });
            } else {
                return new HttpException({ error: 'You have alrady confirmed email'}, HttpStatus.BAD_REQUEST);
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/forgot/email')
    public async forgotPsw(@Param() params: any): Promise<void> {
        try {
            const { email } = params;
            const usr = this.userRep.findOne({ where: { email } });
            if (usr) {
                await this.mailSrv.sendForgotMail(email);
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
