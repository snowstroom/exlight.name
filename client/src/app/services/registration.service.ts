import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class RegistrationService extends Api {

    constructor(injector: Injector) {
        super(injector, environment.domain);
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

    public async auth(email: string, password: string): Promise<void> {
        await this.post('auth', { email, password });
    }
}
