import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { EnviromentService } from '@app/services/envirement.service';
import { User } from '@account-module/models/user';
import { UserNamespace } from '@share/';
import { AuthService, ITokenData } from '@app/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends Api {
  private user: User = new User();
  private user$ = new BehaviorSubject(this.user);

  constructor(
    injector: Injector,
    envSrv: EnviromentService,
    private authSrv: AuthService,
  ) {
    super(injector, envSrv.API_DOMAIN);
    this.authSrv.$authData.subscribe(async (data: ITokenData) =>
      this.init(data),
    );
  }

  get $user(): Observable<User> {
    return this.user$.asObservable();
  }

  public async getProfile(id: number): Promise<User> {
    try {
      const answ = await this.get<UserNamespace.IUser>(`user/${id}`);
      return new User(answ);
    } catch (error) {
      return new User();
    }
  }

  public async updateProfile(
    user: Partial<UserNamespace.IUser>,
  ): Promise<boolean> {
    try {
      await this.put(`user/${this.user.id}`, user);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async init(tokenData: ITokenData): Promise<void> {
    if (tokenData) {
      this.user = await this.getProfile(tokenData.id);
      this.user$.next(this.user);
    }
  }
}
