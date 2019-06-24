import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../models/role.model';
import { Repository } from 'typeorm';
import { AccessNamespace } from 'share';

@Injectable()
export class DbRolesService {
    constructor(@InjectRepository(Role) private roleRep: Repository<Role>) { }

    public async getRolesWithAccess() {
        return await this.roleRep.find({ relations: ['access'] });
    }

    public async addRole(role: Partial<AccessNamespace.IRole>) {
        const roleInst = this.roleRep.create(role);
        const result = await this.roleRep.insert(roleInst);
        const [id] = result.identifiers;
        return id;
    }

    public async updateRole(id: number, role: Partial<AccessNamespace.IRole>) {
        return this.roleRep.update(id, role);
    }

    public async deleteRole(role: Partial<AccessNamespace.IRole>) {
        return this.roleRep.delete(role);
    }
}
