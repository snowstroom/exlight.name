import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface ICategory {
    id?: number;
    route: string;
}

@Entity()
export class Category implements ICategory {
    @PrimaryGeneratedColumn() public id: number;
    @Column({
        unique: true,
        nullable: false,
    }) public route: string;
}
