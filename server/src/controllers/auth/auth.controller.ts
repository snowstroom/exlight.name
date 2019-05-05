import { Controller, Post, Body, Inject, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { IUser, User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { MD5 } from 'crypto-js';
import { USER } from '../../consts/provider-names';
import { ExError } from 'src/classes/err';
import { AuthService } from 'src/services/auth.service';

@Controller('/api/auth')
export class AuthController {
    constructor(
        @Inject(USER) private userRep: Repository<User>,
        private authSrv: AuthService,
    ) { }

    @Post('/')
    @HttpCode(HttpStatus.OK)
    public async userAuth(@Body() user: IUser) {
        try {
            user.password = MD5(user.password).toString();
            const res = await this.userRep.findOne(user);
            if (res) {
                const token = await this.authSrv.signIn({ email: user.email });
                return token;
            } else {
                throw new ExError('User not found or password not true');
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return;
    }

    @Post('/refresh')
    public updateToken() {
        return;
    }

    @Post('/registration')
    public async userRigistr(@Body() user: Partial<IUser>) {
        try {
            user.password = MD5(user.password).toString();
            await this.userRep.insert(user);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
