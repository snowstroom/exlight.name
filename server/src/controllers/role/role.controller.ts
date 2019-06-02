import { Controller, Inject, Post, Body, Delete, HttpStatus, HttpException, Param, Put } from '@nestjs/common';
import { ROLE } from 'src/consts/provider-names';
import { Role, IRole } from 'src/models/role.model';
import { Repository, ObjectLiteral } from 'typeorm';

@Controller({ path: '/api/role' })
export class RoleController {
    constructor(@Inject(ROLE) private roleRep: Repository<Role>) { }

    @Post('/')
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
    public async updateRole(@Param() params: any, @Body() role: Partial<IRole>): Promise<void> {
        try {
            await this.roleRep.update(params.id, role);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    public async deleteRole(@Param() params: any): Promise<void> {
        try {
            await this.roleRep.delete({ id: params.id });
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
