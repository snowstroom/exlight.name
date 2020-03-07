import { Injectable, Injector } from '@angular/core';
import { EnviromentService } from '@app/services/envirement.service';
import { Api } from '@core/classes';
import { AccessNamespace } from '@share/access.namespace';

@Injectable({
  providedIn: 'root',
})
export class AccessApiService extends Api {
  constructor(injector: Injector, envSrv: EnviromentService) {
    super(injector, envSrv.API_DOMAIN);
  }

  public async addAccess(access: AccessNamespace.IAccess): Promise<void> {
    return this.post(`access`, access);
  }

  public async updateAccess(id: number): Promise<void> {
    return this.put(`access/${id}`);
  }

  public async deleteAccess(id: number): Promise<void> {
    return this.delete(`access/${id}`);
  }
}
