import { CanActivate } from '@nestjs/common';

export class AuthGuardService implements CanActivate {
    public canActivate(): boolean {
        return true;
    }
}
