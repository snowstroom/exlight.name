import { Entity, PrimaryColumn, Column } from 'typeorm';

export interface IArticle {
    id?: number;
    title: string;
}

@Entity()
export class Atricle implements IArticle {
    @PrimaryColumn() public id: number;
    @Column() public title: string;
}
