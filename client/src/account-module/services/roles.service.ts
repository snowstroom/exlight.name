import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { EnviromentService } from '@app/services/envirement.service';
import { AccessNamespace } from '@share/access.namespace';
import { RoleApi } from '@account-module/models/api/role.api';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService extends Api {
  constructor(injector: Injector, envSrv: EnviromentService) {
    super(injector, envSrv.API_DOMAIN);
  }

  public async createRole(role: AccessNamespace.IRole): Promise<number> {
    return this.post(`role`, role);
  }

  public async deleteRole(id: number): Promise<void> {
    return this.delete(`role/${id}`);
  }

  public async updateRole(
    id: number,
    role: AccessNamespace.IRole,
  ): Promise<void> {
    return this.put(`role/${id}`, role);
  }

  public async getRoleList(): Promise<RoleApi[]> {
    try {
      const roles = await this.get<AccessNamespace.IRole[]>(`role/list`);
      return roles.map(r => new RoleApi(r));
    } catch (error) {
      throw error;
    }
  }
}
