import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UserNamespace } from 'share';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor(private readonly authSrv: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    public async validate(payload: Partial<UserNamespace.IUser>)  {
        const user = await this.authSrv.validateUser(payload);
        if (user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
