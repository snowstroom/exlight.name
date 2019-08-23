import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class GuardService implements CanActivate {

  constructor(private authSrv: AuthService) {}

  public canActivate(): boolean {
    return true;
  }
}
