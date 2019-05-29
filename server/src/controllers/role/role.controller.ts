import { Controller, Inject, Post, Body, Delete, HttpStatus, HttpException, Param } from '@nestjs/common';
import { ROLE } from 'src/consts/provider-names';
import { Role, IRole } from 'src/models/role.model';
import { Repository } from 'typeorm';

@Controller({ path: 'api/role' })
export class RoleController {
    constructor(@Inject(ROLE) private roleRep: Repository<Role>) { }

    @Post()
    public async addRole(@Body() role: Partial<IRole>): Promise<void> {
        try {
            await this.roleRep.create(role);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete()
    public async deleteRole(@Param() params: any): Promise<void> {
        try {
            await this.roleRep.delete({ id: params.id });
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
