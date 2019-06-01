import { Controller, Inject, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { USER } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { User, IUser } from '../../models/user.model';

@Controller({ path: 'api/user' })
export class UserController {
    constructor(@Inject(USER) private userRep: Repository<User>) { }

    @Put('/:id')
    public async updateUser(@Param() params: any, @Body() user: Partial<IUser>): Promise<void> {
        try {
            await this.userRep.update(params.id, user);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
