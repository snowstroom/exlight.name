import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ITag {
    id?: number;
}

@Entity()
export class Tag implements ITag {
    @PrimaryGeneratedColumn() public id: number;
}
