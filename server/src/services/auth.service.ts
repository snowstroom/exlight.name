import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRep: Repository<User>,
  ) {}

  public async signIn(user: Partial<UserNamespace.IUser>): Promise<string> {
    return this.jwtService.sign(user);
  }

  public async validateUser(user: Partial<UserNamespace.IUser>): Promise<any> {
    return this.userRep.find({ where: { email: user.email } });
  }
}
