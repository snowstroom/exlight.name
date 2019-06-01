import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface ITag {
    id?: number;
    name: string;
}

@Entity({ name: 'tag' })
export class Tag implements ITag {
    @PrimaryGeneratedColumn() public id: number;
    @Column({ nullable: false, unique: true }) public name: string;
}
