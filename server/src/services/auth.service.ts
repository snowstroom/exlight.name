import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'server/src/models/user.model';
import { USER } from 'server/src/consts/provider-names';
import { UserNamespace } from 'share';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(USER) private userRep: Repository<User>,
    ) { }

    public async signIn(user: Partial<UserNamespace.IUser>): Promise<string> {
        return this.jwtService.sign(user);
    }

    public async validateUser(user: Partial<UserNamespace.IUser>): Promise<any> {
        return await this.userRep.findOne({
            email: user.email,
        });
    }
}
