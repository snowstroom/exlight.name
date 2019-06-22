import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'server/src/models/user.model';
import { UserNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private userRep: Repository<User>,
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
