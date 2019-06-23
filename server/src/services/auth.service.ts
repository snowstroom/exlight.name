import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserNamespace } from 'share';
import { DbUserService } from './db-user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private dbUserSrv: DbUserService,
    ) { }

    public async signIn(user: Partial<UserNamespace.IUser>): Promise<string> {
        return this.jwtService.sign(user);
    }

    public async validateUser(user: Partial<UserNamespace.IUser>): Promise<any> {
        return this.dbUserSrv.findByEmail(user.email);
    }
}
