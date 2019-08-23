import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { EnviromentService } from '@app/services/envirement.service';
import { User } from '@account-module/models/user';
import { UserNamespace } from '@share/';
import { AuthService, ITokenData } from '@app/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends Api {
    private user: User;
    private user$ = new BehaviorSubject(this.user);

    constructor(
        injector: Injector,
        envSrv: EnviromentService,
        private authSrv: AuthService
    ) {
        super(injector, envSrv.API_DOMAIN);
        this.authSrv.$authData.subscribe(async (data: ITokenData) => this.init(data.id));
    }

    get $user(): Observable<User> {
        return this.user$.asObservable();
    }

    public async getProfile(id: number): Promise<User> {
        try {
            const answ = await this.get<UserNamespace.IUser>(`user/${id}`);
            return new User(answ);
        } catch (error) {
            return null;
        }
    }

    public async updateProfile(id: number, user: UserNamespace.IUser): Promise<boolean> {
        try {
            await this.put(`user/${id}`, user);
            return true;
        } catch (error) {
            return false;
        }
    }

    private async init(id: number): Promise<void> {
        this.user = await this.getProfile(id);
        this.user$.next(this.user);
    }

}
