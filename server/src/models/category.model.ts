import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export interface ICategory {
    id?: number;
    route: string;
    name: string;
    description: string;
}

@Entity({ name: 'categories' })
export class Category implements ICategory {
    @PrimaryGeneratedColumn() public id: number;
    @Column({
        unique: true,
        nullable: false,
    }) public route: string;
    @Column({
        unique: true,
        nullable: false,
    }) public name: string;
    @Column() public description: string;
}
