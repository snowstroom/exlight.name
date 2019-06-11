import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from 'src/models/role.model';
import { ROLE } from 'src/consts/provider-names';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';

@Injectable()
export class RolesAccesService {
    private roles: Role[];
    private rolesByIdMap = new Map<number, Role>();
    private defaultRole: Role;

    constructor(@Inject(ROLE) private readonly rolesRep: Repository<Role>) {
        this.init();
    }

    get defRole(): Role {
        return this.defaultRole;
    }

    private async init(): Promise<void> {
        const roles = await this.rolesRep.find({ relations: ['access'] });
        this.roles = roles;
        roles.forEach(r => {
            this.rolesByIdMap.set(r.id, r);
            if (process.env.DEFAULT_USER_ROLE_NAME === r.name) {
                this.defaultRole = r;
            }
        });
    }

    public isAllow(entity: E_ENTITY_TYPES, access: number, roleId: number): boolean {
        const role = this.rolesByIdMap.get(roleId);
        const result = role.access.find(acc => acc.entity === entity &&  acc.access >= access);
        return !!result;
    }

}