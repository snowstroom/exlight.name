import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Access } from './access.model';
import { AccessNamespace } from 'share';

@Entity({ name: AccessNamespace.E_ENTITY_TYPES.role })
export class Role implements AccessNamespace.IRole {
    @PrimaryGeneratedColumn() public id: number;
    @Column({ unique: true, primary: true }) public name: string;
    @Column() public description: string;

    @OneToMany(type => User, user => user.role)
    public users: User[];

    @OneToMany(type => Access, access => access.role)
    public access: Access[];
}
