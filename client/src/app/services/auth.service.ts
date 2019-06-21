import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { environment } from 'environments/environment';
import { StorageService } from '@core/services/storage.service';
import { EnviromentService } from './envirement.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends Api {
    constructor(
        injector: Injector,
        envSrv: EnviromentService,
        private storageSrv: StorageService
    ) {
        super(injector, envSrv.API_DOMAIN);
    }

    public async auth(email: string, password: string): Promise<void> {
        try {
            const token = await this.post('auth', { email, password });
            this.storageSrv.setSessionItem(TOKEN_KEY, token);
        } catch {

        }
    }

}
