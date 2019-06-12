import { CanActivate } from '@angular/router';

export class GuardService implements CanActivate {

    constructor() { }
    
    public canActivate(): boolean {
        return true;
    }
}
