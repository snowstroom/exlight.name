import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.model';

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
    @Column({ type: 'date', default: new Date() }) public createDate: Date;
    @Column({ type: 'date' }) public updateDate: Date;

    @ManyToOne(type => User, user => user.comments)
    public user: User;
}
