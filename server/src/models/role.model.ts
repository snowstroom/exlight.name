import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Access } from './access.model';

export interface IRole {
    id?: number;
}

@Entity()
export class Role implements IRole {
    @PrimaryGeneratedColumn() public id: number;
    @Column({ unique: true }) public name: string;
    @Column() public description: string;

    @OneToMany(type => User, user => user.role)
    public users: User[];

    @OneToMany(type => Access, access => access.roleId)
    public access: Access[];
}
