import { Controller, Put, Param, Body, HttpException, HttpStatus, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace, UserNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: 'api/user' })
@UseGuards(AuthGuardService)
export class UserController {
    constructor(@InjectRepository(User) private userRep: Repository<User>) { }

    @Get('/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.tag)
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
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.tag)
    public async updateUser(@Param() params: any, @Body() user: Partial<UserNamespace.IUser>): Promise<void> {
        try {
            await this.userRep.update(params.id, user);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
