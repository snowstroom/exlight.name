import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Min, Max } from 'class-validator';

export interface IRating {
    id?: number;
    // userId: number;
    rating: number;
    dateOfCreate: Date;
}

@Entity({ name: 'rating '})
export class Rating implements IRating {
    @PrimaryColumn() public id: number;
    @Max(5) @Min(1) @Column({ nullable: false, type: 'int2' }) public rating: number;
    @Column({ default: new Date(), type: 'date' }) public dateOfCreate: Date;

    // @OneToMany()
}
