import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { User } from './user.model';
import { ArticleNamespace } from 'share';
import { Atricle } from './article.model';

export const ARTICLE_COMMENTS_ENTITY = 'article_comments';

@Entity({ name: ARTICLE_COMMENTS_ENTITY })
@Tree('materialized-path') // https://github.com/typeorm/typeorm/blob/master/docs/tree-entities.md
export class Commentary implements ArticleNamespace.IArticleCommentary {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public articleId: number;
  @Column() public comment: string;
  @CreateDateColumn({ default: new Date() }) public createDate: Date;
  @UpdateDateColumn() public updateDate: Date;

  @TreeChildren()
  public comments: Commentary[];

  @TreeParent()
  public parentComment: Commentary;

  @ManyToOne(type => User, user => user.comments)
  public user: User;

  @ManyToOne(type => Atricle, article => article.comments)
  public article: Atricle;
}
