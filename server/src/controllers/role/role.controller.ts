import { Controller, Inject, Post, Body, Delete, HttpStatus, HttpException, Param, Put, SetMetadata, UseGuards, Get } from '@nestjs/common';
import { ROLE } from 'server/src/consts/provider-names';
import { Role } from 'server/src/models/role.model';
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';
import { META_ENTITY_KEY, META_ACCESS_KEY, META_PUBLIC_KEY } from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace } from 'share';

@Controller({ path: '/api/role' })
@UseGuards(AuthGuardService)
export class RoleController {
    constructor(
        @Inject(ROLE) private roleRep: Repository<Role>,
    ) { }

    @Get('/list')
    @SetMetadata(META_PUBLIC_KEY, true)
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.E_ENTITY_TYPES.role)
    public async getList(): Promise<any> {
        try {
            const dbRes = await this.roleRep.find({ relations: ['access'] });
            return dbRes;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.role)
    public async addRole(@Body() role: DeepPartial<Role>): Promise<ObjectLiteral> {
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
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.role)
    public async updateRole(@Param() params: any, @Body() role: DeepPartial<Role>): Promise<void> {
        try {
            await this.roleRep.update(params.id, role);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.role)
    public async deleteRole(@Param() params: any): Promise<void> {
        try {
            await this.roleRep.delete({ id: params.id });
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
