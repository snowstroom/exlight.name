import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';
import { UserNamespace } from 'share';

@Injectable()
export class DbUserService {
    constructor(@InjectRepository(User) private userRep: Repository<User>) { }

    public async findByEmail(email: string) {
        return await this.userRep.findOne({ email });
    }

    public async getUserByWhere(user: Partial<UserNamespace.IUser>) {
        return this.userRep.findOne({
            where: user,
        });
    }

    public async addUser(user: Partial<UserNamespace.IUser>): Promise<number> {
        const result = await this.userRep.insert(user);
        return result.identifiers[0].id;
    }

    public async updateUser(id: number, user: Partial<UserNamespace.IUser>) {
        return await this.userRep.update(id, user);
    }

    public async deleteUserByWhere(user: Partial<UserNamespace.IUser>) {
        return await this.userRep.delete(user);
    }
}
