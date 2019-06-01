import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface ICommentary {
    id?: number;
    articleId: number;
    comment: string;
    commentId: number;
    createDate: string | Date;
    updateDate: string | Date;
}
@Entity({ name: 'article_comments' })
export class Commentary implements ICommentary {
    @PrimaryGeneratedColumn() public id: number;

    @Column() public articleId: number;
    @Column() public comment: string;
    @Column() public commentId: number;
    @Column({ type: 'datetime', default: new Date() }) public createDate: Date;
    @Column({ type: 'datetime' }) public updateDate: Date;
}
