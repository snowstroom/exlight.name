import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ArticleNamespace } from 'share';

export const TAG_ENTITY = 'tags';

@Entity({ name: TAG_ENTITY })
export class Tag implements ArticleNamespace.ITag {
  @PrimaryGeneratedColumn() public id: number;
  @Column({ nullable: false, unique: true }) public name: string;
}
