import { Controller, Inject, Put, Param, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import { USER } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { User, IUser } from '../../models/user.model';

@Controller({ path: 'api/user' })
export class UserController {
    constructor(@Inject(USER) private userRep: Repository<User>) { }

    @Get('/:id')
    public async getUserInfo(@Param() param: any) {
        try {
            const res = await this.userRep.findOne(param.id, {
                select: ['id', 'email', 'firstname', 'secondname', 'roleId'],
            });
            if (res) {
                return res;
            } else {
                throw new HttpException({ error: ''}, HttpStatus.NOT_FOUND);
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id')
    public async updateUser(@Param() params: any, @Body() user: Partial<IUser>): Promise<void> {
        try {
            await this.userRep.update(params.id, user);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
