import { Injectable, Injector } from '@angular/core';
import { Api } from '@core/classes';
import { StorageService } from '@core/services/storage.service';
import { EnvironmentService } from './envirement.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOKEN_KEY } from '@app/consts/keys';

interface IAuth {
  token: string;
}

export interface ITokenData {
  id: number;
  email: string;
  roleId: number;
  iat: number;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends Api {
  public authData: ITokenData;
  private authData$ = new BehaviorSubject<ITokenData>(this.authData);

  constructor(
    injector: Injector,
    envSrv: EnvironmentService,
    private storageSrv: StorageService,
  ) {
    super(injector, envSrv.API_DOMAIN);
    this.init();
  }

  get $authData(): Observable<ITokenData> {
    return this.authData$.asObservable();
  }

  public async auth(email: string, password: string): Promise<boolean> {
    try {
      const token: IAuth = await this.post('auth', { email, password });
      this.storageSrv.setSessionItem(TOKEN_KEY, token.token);
      this.parseToken(token.token);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  public parseToken(token: string): void {
    const p2: string = token.split('.')[1];
    const tokenData = atob(p2);
    this.authData = JSON.parse(tokenData);
    this.authData$.next(this.authData);
  }

  private init(): void {
    const token: string = this.storageSrv.getSessionItem(TOKEN_KEY);
    if (token) {
      this.parseToken(token);
    }
  }
}
