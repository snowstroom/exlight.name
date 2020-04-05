import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.model';
import { Tag } from './tag.model';
import { User } from './user.model';
import { ArticleNamespace } from 'share';
import { Rating } from './rating.model';
import { Commentary } from './commentary.model';

export const ARTICLE_TABLE_NAME = 'articles';

@Entity({ name: ARTICLE_TABLE_NAME })
export class Article implements ArticleNamespace.IArticle {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public title: string;
  @Column({ type: 'date', default: new Date() }) public publicationDate: Date;
  @Column() public description: string;
  @Column() public content: string;
  @Column() public route: string;
  @Column({ default: 0 }) public views: number;

  @ManyToOne(type => User, user => user.id)
  @Column({ nullable: false })
  public author: number;

  @OneToMany(type => Category, category => category.id)
  @Column({ nullable: false })
  public categoryId: number;

  @OneToMany(type => Commentary, comment => comment.article)
  public comments: Commentary[];

  @OneToMany(type => Rating, rating => rating.article)
  public ratings: Rating[];

  @ManyToMany(type => Tag)
  @JoinTable({ name: 'articles_tags' })
  public tags: Tag[];
}
