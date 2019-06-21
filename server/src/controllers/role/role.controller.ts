import { Controller, Inject, Post, Body, Delete, HttpStatus, HttpException, Param, Put, SetMetadata, UseGuards, Get } from '@nestjs/common';
import { ROLE } from 'src/consts/provider-names';
import { Role, IRole } from 'src/models/role.model';
import { Repository, ObjectLiteral } from 'typeorm';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { META_ENTITY_KEY, META_ACCESS_KEY, META_PUBLIC_KEY } from 'src/consts/meta-keys';
import { CREATE, UPDATE, DELETE, READ } from 'src/consts/access';
import { AuthGuardService } from 'src/guards/auth.guard';

@Controller({ path: '/api/role' })
@UseGuards(AuthGuardService)
export class RoleController {
    constructor(
        @Inject(ROLE) private roleRep: Repository<Role>,
    ) { }

    @Get('/list')
    @SetMetadata(META_PUBLIC_KEY, true)
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ACCESS_KEY, E_ENTITY_TYPES.role)
    public async getList(): Promise<any> {
        try {
            const dbRes = await this.roleRep.find({ relations: ['access'] });
            return dbRes;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/')
    @SetMetadata(META_ACCESS_KEY, CREATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.role)
    public async addRole(@Body() role: Partial<IRole>): Promise<ObjectLiteral> {
        try {
            const roleInst = this.roleRep.create(role);
            const dbRes = await this.roleRep.insert(roleInst);
            const [ id ] = dbRes.identifiers;
            return id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id')
    @SetMetadata(META_ACCESS_KEY, UPDATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.role)
    public async updateRole(@Param() params: any, @Body() role: Partial<IRole>): Promise<void> {
        try {
            await this.roleRep.update(params.id, role);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    @SetMetadata(META_ACCESS_KEY, DELETE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.role)
    public async deleteRole(@Param() params: any): Promise<void> {
        try {
            await this.roleRep.delete({ id: params.id });
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
