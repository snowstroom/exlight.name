import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { EnviromentService } from './envirement.service';
import { Role } from '@app/classes/role';
import { AccessNamespace } from '@share/access.namespace';

@Injectable({ providedIn: 'root' })
export class RolesAccessService extends Api {
    private rolesByIdMap = new Map<number, Role>();

    constructor(
        envSrv: EnviromentService,
        injector: Injector
    ) {
        super(injector, envSrv.API_DOMAIN);
        this.init();
    }

    public isAllow(entity: AccessNamespace.E_ENTITY_TYPES, access: number, roleId: number): boolean {
        const role = this.rolesByIdMap.get(roleId);
        const result = role.access.find(acc => acc.entity === entity && acc.access >= access);
        return !!result;
    }

    public async getRoles(): Promise<Role[]> {
        try {
            const roles = await this.get<AccessNamespace.IRole[]>('role/list');
            return roles.map(r => new Role(r));
        } catch {
            return [];
        }
    }

    public async addRole(role: AccessNamespace.IRole): Promise<boolean> {
        try {
            await this.post('role', role);
            return true;
        } catch {
            return false;
        }
    }

    public async updateRole(role: AccessNamespace.IRole): Promise<boolean> {
        try {
            await this.put(`role/${role.id}`, role);
            return true;
        } catch {
            return false;
        }
    }

    public async deleteRole(id: number): Promise<boolean> {
        try {
            await this.delete(`role/${id}`);
            return true;
        } catch {
            return false;
        }
    }

    public async addAccess(access: AccessNamespace.IAccess): Promise<boolean> {
        try {
            await this.post('access', access);
            return true;
        } catch {
            return false;
        }
    }

    public async updateAccess(access: AccessNamespace.IAccess): Promise<boolean> {
        try {
            await this.put(`access/${access.id}`, access);
            return true;
        } catch {
            return false;
        }
    }

    public async deleteAccess(id: number): Promise<boolean> {
        try {
            await this.delete(`access/${id}`);
            return true;
        } catch {
            return false;
        }
    }

    private async init(): Promise<void> {
        const roles = await this.getRoles();
        roles.forEach(r => this.rolesByIdMap.set(r.id, r));
    }
}
