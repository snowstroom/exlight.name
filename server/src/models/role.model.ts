import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Access } from './access.model';

export const ROLES_ENTITY = 'roles';
export interface IRole {
    id?: number;
    name: string;
    description: string;
}

@Entity({ name: ROLES_ENTITY })
export class Role implements IRole {
    @PrimaryGeneratedColumn() public id: number;
    @Column({ unique: true }) public name: string;
    @Column() public description: string;

    @OneToMany(type => User, user => user.role)
    public users: User[];

    @OneToMany(type => Access, access => access.role)
    public access: Access[];
}
