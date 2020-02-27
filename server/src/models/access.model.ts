import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AccessNamespace } from 'share';

@Entity({ name: AccessNamespace.E_ENTITY_TYPES.access })
export class Access implements AccessNamespace.IAccess {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public entity: string | AccessNamespace.E_ENTITY_TYPES;
  @Column() public access: number;
  @Column({ type: 'varchar', nullable: true }) public description: string;
}
