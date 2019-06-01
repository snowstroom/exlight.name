import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.model';

export interface IAccess {
    id: number;
    roleId: number;
    entity: string;
    access: number;
}

@Entity()
export class Access implements IAccess {
    @PrimaryGeneratedColumn() public id: number;
    @Column() public roleId: number;
    @Column() public entity: string;
    @Column() public access: number;

    @ManyToOne(type => Role, role => role.access)
    public role: Role;
}
