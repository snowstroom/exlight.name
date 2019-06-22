import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.model';
import { AccessNamespace } from 'share';

@Entity({ name: AccessNamespace.E_ENTITY_TYPES.access })
export class Access implements AccessNamespace.IAccess {
    @PrimaryGeneratedColumn() public id: number;
    @Column() public roleId: number;
    @Column() public entity: string | AccessNamespace.E_ENTITY_TYPES;
    @Column() public access: number;

    @ManyToOne(type => Role, role => role.access)
    public role: Role;
}
