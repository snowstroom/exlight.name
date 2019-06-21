import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GuardService implements CanActivate {

  constructor() { }

  public canActivate(): boolean {
    return true;
  }
}
