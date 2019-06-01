import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const TAG_ENTITY = 'tags';
export interface ITag {
    id?: number;
    name: string;
}

@Entity({ name: TAG_ENTITY })
export class Tag implements ITag {
    @PrimaryGeneratedColumn() public id: number;
    @Column({ nullable: false, unique: true }) public name: string;
}
