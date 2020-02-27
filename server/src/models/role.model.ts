import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.model';
import { Access } from './access.model';
import { AccessNamespace } from 'share';

@Entity({ name: AccessNamespace.E_ENTITY_TYPES.role })
export class Role implements AccessNamespace.IRole {
  @PrimaryGeneratedColumn() public id: number;
  @Column({ unique: true }) public name: string;
  @Column() public description: string;

  @OneToMany(type => User, user => user.role)
  public users: User[];

  @ManyToMany(type => Access)
  @JoinTable({ name: 'roles_accesses' })
  public access: Access[];
}
