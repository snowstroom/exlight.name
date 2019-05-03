import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ICommentary {
    id?: number;
}
@Entity()
export class Commentary implements ICommentary {
    @PrimaryGeneratedColumn() public id: number;
}
