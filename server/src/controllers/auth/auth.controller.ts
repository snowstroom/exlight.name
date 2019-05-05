import { Controller, Post, Body, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUser, User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { USER } from '../../consts/provider-names';

@Controller('/api/auth')
export class AuthController {
    constructor(@Inject(USER) private userRep: Repository<User>) { }

    @Post()
    public userAuth(@Body() user: IUser) {
        return;
    }

    @Post('/refresh')
    public updateToken() {
        return;
    }

    @Post('/registration')
    public async userRigistr(@Body() user: Partial<IUser>) {
        try {
            await this.userRep.insert(user);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
