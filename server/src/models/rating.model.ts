import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Min, Max } from 'class-validator';
import { User } from './user.model';
import { ArticleNamespace } from 'share';

export const RATING_ENTITY = 'rating';

@Entity({ name: RATING_ENTITY })
export class Rating implements ArticleNamespace.IRating {
    @PrimaryColumn() public id: number;
    @Max(5) @Min(1) @Column({ nullable: false, type: 'int2' }) public rating: number;
    @Column({ default: new Date(), type: 'date' }) public dateOfCreate: Date;

    @ManyToOne(type => User, user => user.ratings)
    public user: User;
}
