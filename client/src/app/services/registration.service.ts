import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { EnvironmentService } from './envirement.service';

@Injectable({ providedIn: 'root' })
export class RegistrationService extends Api {
  constructor(injector: Injector, envSrv: EnvironmentService) {
    super(injector, envSrv.API_DOMAIN);
  }

  public async registration(email: string, password: string): Promise<void> {
    try {
      await this.post('auth/registration', { email, password });
    } catch (err) {}
  }

  public async forgot(email: string): Promise<void> {
    try {
      await this.get(`auth/forgot/${email}`);
    } catch (err) {}
  }

  public async confirm(hash: string): Promise<boolean> {
    try {
      await this.get(`auth/confirm/email?hash=${hash}`);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async disable(hash: string): Promise<boolean> {
    try {
      await this.get(`auth/disable/email?hash=${hash}`);
      return true;
    } catch (err) {
      return false;
    }
  }
}
