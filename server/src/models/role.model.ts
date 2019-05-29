import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IRole {
    id?: number;
}

@Entity()
export class Role implements IRole {
    @PrimaryGeneratedColumn() public id: number;
    @Column() public name: string;
}
