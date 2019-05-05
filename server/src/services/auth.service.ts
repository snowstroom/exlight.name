import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, IUser } from 'src/models/user.model';
import { USER } from 'src/consts/provider-names';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(USER) private userRep: Repository<User>,
    ) { }

    public async signIn(user: Partial<IUser>): Promise<string> {
        return this.jwtService.sign(user);
    }

    public async validateUser(user: Partial<IUser>): Promise<any> {
        return await this.userRep.findOne({
            email: user.email,
        });
    }
}
