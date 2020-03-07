import { Injectable, Injector } from '@angular/core';
import { Api, PaginationParams } from '@core/classes';
import { EnviromentService } from '@app/services/envirement.service';
import { UserApi } from '@account-module/models/api/user';
import { UserNamespace, ApiNamespace as API } from '@share/';
import { AuthService, ITokenData } from '@app/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends Api {
  private user: UserApi = new UserApi();
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

  get $user(): Observable<UserApi> {
    return this.user$.asObservable();
  }

  public async getProfile(id: number): Promise<UserApi> {
    try {
      const answ = await this.get<UserNamespace.IUser>(`user/${id}`);
      return new UserApi(answ);
    } catch (error) {
      return new UserApi();
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

  public async getUsers(
    pagination: PaginationParams,
    roleId?: number,
  ): Promise<UserApi[]> {
    try {
      const params = pagination.getUrlString();
      const roleParams = roleId ? `&roleId=${roleId}` : ``;
      const userList = await this.get<
        API.IPaginationContent<UserNamespace.IUser>
      >(`user/list${params}${roleParams}`);
      return userList.content.map(u => new UserApi(u));
    } catch (error) {
      return [];
    }
  }

  private async init(tokenData: ITokenData): Promise<void> {
    if (tokenData) {
      this.user = await this.getProfile(tokenData.id);
      this.user$.next(this.user);
    }
  }
}
