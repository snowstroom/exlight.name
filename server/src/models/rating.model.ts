import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Min, Max } from 'class-validator';
import { User } from './user.model';
import { ArticleNamespace } from 'share';
import { Atricle } from './article.model';

export const RATING_ENTITY = 'rating';

@Entity({ name: RATING_ENTITY })
export class Rating implements ArticleNamespace.IRating {
  @PrimaryGeneratedColumn() public id: number;
  @Max(5)
  @Min(1)
  @Column({ nullable: false, type: 'int2' })
  public rating: ArticleNamespace.RatingNumber;
  @Column({ default: new Date(), type: 'date' }) public dateOfCreate: Date;

  @ManyToOne(type => Atricle, article => article.ratings)
  public article: Atricle;

  @ManyToOne(type => User, user => user.ratings)
  public user: User;
}
