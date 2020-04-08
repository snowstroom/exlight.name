import { ArticleNamespace } from 'share';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { Commentary } from './commentary.model';

export const COMMENTS_LIKE = 'commentaries_likes';

@Entity({ name: COMMENTS_LIKE })
export class CommentaryLike implements ArticleNamespace.IArticleCommentaryLike {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public authorId: number;
  @Column() public commentaryId: number;

  @ManyToOne(type => User, user => user.id)
  public user: User;
  @ManyToOne(type => Commentary, commentary => commentary.id)
  public commentary: Commentary;
}
