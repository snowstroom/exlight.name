import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.model';

export const ARTICLE_COMMENTS_ENTITY = 'article_comments';

export interface ICommentary {
    id?: number;
    articleId: number;
    comment: string;
    commentId: number;
    createDate: string | Date;
    updateDate: string | Date;
}
@Entity({ name: ARTICLE_COMMENTS_ENTITY })
export class Commentary implements ICommentary {
    @PrimaryGeneratedColumn() public id: number;

    @Column() public articleId: number;
    @Column() public comment: string;
    @Column() public commentId: number;
    @CreateDateColumn() public createDate: Date;
    @UpdateDateColumn() public updateDate: Date;

    @ManyToOne(type => User, user => user.comments)
    public user: User;
}
