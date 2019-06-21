import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { EnviromentService } from './envirement.service';

@Injectable({ providedIn: 'root' })
export class RegistrationService extends Api {

    constructor(
        injector: Injector,
        envSrv: EnviromentService
    ) {
        super(injector, envSrv.API_DOMAIN);
    }

    public async registration(email: string, password: string): Promise<void> {
        try {
            await this.post('auth/registration', { email, password });
        } catch (err) { }
    }

    public async forgot(email: string): Promise<void> {
        try {
            await this.get(`auth/forgot/${email}`);
        } catch (err) {

        }
    }
}
