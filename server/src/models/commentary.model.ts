import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.model';
import { ArticleNamespace } from 'share';

export const ARTICLE_COMMENTS_ENTITY = 'article_comments';

@Entity({ name: ARTICLE_COMMENTS_ENTITY })
export class Commentary implements ArticleNamespace.IArticleCommentary {
    @PrimaryGeneratedColumn() public id: number;

    @Column() public articleId: number;
    @Column() public comment: string;
    @Column() public commentId: number;
    @Column() public authorId: number;
    @CreateDateColumn({ default: new Date() }) public createDate: Date;
    @UpdateDateColumn() public updateDate: Date;

    @ManyToOne(type => User, user => user.comments)
    public user: User;
}
