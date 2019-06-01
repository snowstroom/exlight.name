import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Commentary } from './commentary.model';
import { Rating } from './rating.model';
import { Role } from './role.model';
export interface IUser {
    id?: number;
    email: string;
    firstname: string;
    secondname: string;
    password: string;
    // roleId: number;
}

@Entity({ name: 'users' })
export class User implements IUser {
    @PrimaryGeneratedColumn() public id: number;
    @IsEmail() @Column({ unique: true, nullable: false }) public email: string;
    @Column({ nullable: true }) public firstname: string;
    @Column({ nullable: true }) public secondname: string;
    @Column({ nullable: false }) public password: string;

    @OneToMany(type => Commentary, comment => comment.id)
    public comments: Commentary[];

    @OneToMany(type => Rating, rating => rating.id)
    public ratings: Rating[];

    @ManyToOne(type => Role, role => role.id)
    public role: Role;
}
