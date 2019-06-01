import { Entity, Column } from 'typeorm';

export interface IAccess {
    roleId: number;
    entity: string;
    access: number;
}

@Entity()
export class Access implements IAccess {
    @Column() public roleId: number;
    @Column() public entity: string;
    @Column() public access: number;
}
