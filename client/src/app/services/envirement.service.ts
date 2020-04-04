import { Injectable } from '@angular/core';
import * as Platform from 'platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { E_SCREEN_TYPE } from '@app/enums/screen-type';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public readonly API_DOMAIN = environment.apiDomain;
  public readonly DOMAIN = environment.domain;
  public readonly PLATFORM = Platform.parse(navigator.userAgent);
  private screenType = new BehaviorSubject<E_SCREEN_TYPE>(
    this.initMediaListen(),
  );

  constructor() {
    matchMedia('(max-width: 575px)').addListener((e) => {
      if (e.matches) {
        this.screenType.next(E_SCREEN_TYPE.EXS);
      }
    });
    matchMedia('(min-width: 576px) and (max-width: 767px)').addListener((e) => {
      if (e.matches) {
        this.screenType.next(E_SCREEN_TYPE.SM);
      }
    });
    matchMedia('(min-width: 768px) and (max-width: 991px)').addListener((e) => {
      if (e.matches) {
        this.screenType.next(E_SCREEN_TYPE.MD);
      }
    });
    matchMedia('(min-width: 992px) and (max-width: 1199px)').addListener(
      (e) => {
        if (e.matches) {
          this.screenType.next(E_SCREEN_TYPE.LG);
        }
      },
    );
    matchMedia('(min-width: 1200px)').addListener((e) => {
      if (e.matches) {
        this.screenType.next(E_SCREEN_TYPE.ELG);
      }
    });
  }

  get $screenType(): Observable<E_SCREEN_TYPE> {
    return this.screenType.asObservable();
  }

  private initMediaListen(): E_SCREEN_TYPE {
    if (matchMedia('(max-width: 576px)').matches) {
      return E_SCREEN_TYPE.EXS;
    }
    if (matchMedia('(min-width: 576px) and (max-width: 767px)').matches) {
      return E_SCREEN_TYPE.SM;
    }
    if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
      return E_SCREEN_TYPE.MD;
    }
    if (matchMedia('(min-width: 992px) and (max-width: 1199px)').matches) {
      return E_SCREEN_TYPE.LG;
    }
    if (matchMedia('(min-width: 1200px)').matches) {
      return E_SCREEN_TYPE.ELG;
    }
  }
}
