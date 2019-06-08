import { Controller, Inject, Put, Param, Body, HttpException, HttpStatus, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { USER } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { User, IUser } from '../../models/user.model';
import { READ, UPDATE } from 'src/consts/access';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'src/consts/meta-keys';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { AuthGuardService } from 'src/guards/auth.guard';

@Controller({ path: 'api/user' })
@UseGuards(AuthGuardService)
export class UserController {
    constructor(@Inject(USER) private userRep: Repository<User>) { }

    @Get('/:id')
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.tag)
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
    @SetMetadata(META_ACCESS_KEY, UPDATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.tag)
    public async updateUser(@Param() params: any, @Body() user: Partial<IUser>): Promise<void> {
        try {
            await this.userRep.update(params.id, user);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
