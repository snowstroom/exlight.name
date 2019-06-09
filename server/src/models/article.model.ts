import { Entity, Column, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.model';
import { Tag } from './tag.model';

export const ARTICLE_ENTITY = 'articles';

export interface IArticle {
    id?: number;
    title: string;
    publicationDate?: string | Date;
    description: string;
    content: string;
    // views: number;
    categoryId: number;
    route: string;
    // rating: number;
    // isAppreciated: boolean;
}

@Entity({ name: ARTICLE_ENTITY })
export class Atricle implements IArticle {
    @PrimaryGeneratedColumn() public id: number;
    @Column() public title: string;
    @Column({ type: 'date', default: new Date() })
    public publicationDate: Date;
    @Column() public description: string;
    @Column() public content: string;
    @Column() public route: string;

    @OneToMany(type => Category, category => category.id)
    public categoryId: number;

    @ManyToMany(type => Tag) @JoinTable({ name: 'articles_tags' })
    public tags: Tag[];

}
