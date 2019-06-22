import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ArticleNamespace } from 'share';

export const CATEGORY_ENTITY = 'categories';

@Entity({ name: CATEGORY_ENTITY })
export class Category implements ArticleNamespace.ICategory {
    @PrimaryGeneratedColumn() public id: number;
    @Column({ unique: true, nullable: false }) public route: string;
    @Column({ unique: true, nullable: false }) public name: string;
    @Column() public description: string;
}
