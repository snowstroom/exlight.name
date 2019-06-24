import { Injectable } from '@nestjs/common';
import { Role } from 'server/src/models/role.model';
import { CONFIRMED_USER_ROLE_NAME } from 'server/src/consts/default-entity';
import { AccessNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesAccesService {
    private roles: Role[];
    private rolesByIdMap = new Map<number, Role>();
    private defaultRole: Role;
    private defaultConfirmRole: Role;

    constructor(@InjectRepository(Role) private roleRep: Repository<Role>) {
        this.init();
    }

    get defRole(): Role {
        return this.defaultRole;
    }

    get defConfirmRole(): Role {
        return this.defaultConfirmRole;
    }

    private async init(): Promise<void> {
        const roles = await this.roleRep.find({ relations: ['access'] });
        this.roles = roles;
        roles.forEach(r => {
            this.rolesByIdMap.set(r.id, r);
            if (process.env.DEFAULT_USER_ROLE_NAME === r.name) {
                this.defaultRole = r;
            }
            if (r.name === CONFIRMED_USER_ROLE_NAME) {
                this.defaultConfirmRole = r;
            }
        });
    }

    public isAllow(entity: AccessNamespace.E_ENTITY_TYPES, access: number, roleId: number): boolean {
        const role = this.rolesByIdMap.get(roleId);
        const result = role.access.find(acc => acc.entity === entity && acc.access >= access);
        return !!result;
    }

}
