import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtStrategyService } from 'src/services/jwt-strategy.service';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { IUser } from 'src/models/user.model';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private readonly jwt: JwtService) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: IncomingMessage = context.switchToHttp().getRequest();
        try {
            await this.jwt.verifyAsync(req.headers.Authorization as string);
            return true;
        } catch {
            return false;
        }
    }
}
