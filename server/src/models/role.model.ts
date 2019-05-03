import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IRole {
    id?: number;
}

@Entity()
export class Role implements IRole {
    @PrimaryGeneratedColumn() public id: number;
}
