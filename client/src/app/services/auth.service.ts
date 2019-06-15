import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { environment } from 'environments/environment';
import { StorageService } from '@core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends Api {
    constructor(
        injector: Injector,
        private storageSrv: StorageService
    ) {
        super(injector, environment.domain);
    }

    public async auth(email: string, password: string): Promise<void> {
        try {
            const token = await this.post('auth', { email, password });
            this.storageSrv.setSessionItem(TOKEN_KEY, token);
        } catch {

        }
    }
}
