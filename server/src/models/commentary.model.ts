import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface ICommentary {
    id?: number;
    articleId: number;
}
@Entity()
export class Commentary implements ICommentary {
    @PrimaryGeneratedColumn() public id: number;

    @Column() public articleId: number;
}
