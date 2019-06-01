import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.model';
import { Tag } from './tag.model';

export interface IArticle {
    id: number;
    title: string;
    publicationDate: string | Date;
    description: string;
    content: string;
    // views: number;
    categoryId: number;
    route: string;
    // rating: number;
    // isAppreciated: boolean;
}

@Entity({ name: 'articles' })
export class Atricle implements IArticle {
    @PrimaryColumn() public id: number;
    @Column() public title: string;
    @Column({ type: 'date' })
    public publicationDate: Date;
    @Column() public description: string;
    @Column() public content: string;
    @Column() public route: string;

    @OneToMany(type => Category, category => category.id)
    public categoryId: number;

    @ManyToMany(type => Tag) @JoinTable({ name: 'articles_tags' })
    public tags: Tag[];

}
