import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Commentary } from './commentary.model';
import { Rating } from './rating.model';
import { Role } from './role.model';
import { Atricle } from './article.model';
import { UserNamespace } from 'share';

export const USER_ENTITY = 'users';

@Entity({ name: USER_ENTITY })
export class User implements UserNamespace.IUser {
    @PrimaryGeneratedColumn() public id: number;
    @IsEmail() @Column({ unique: true, nullable: false }) public email: string;
    @Column({ nullable: true }) public firstname: string;
    @Column({ nullable: true }) public secondname: string;
    @Column({ nullable: false }) public password: string;
    @Column({ nullable: false }) public roleId: number;

    @OneToMany(type => Commentary, comment => comment.user)
    public comments: Commentary[];

    @OneToMany(type => Rating, rating => rating.id)
    public ratings: Rating[];

    @OneToMany(type => Atricle, article => article.author)
    public articles: Atricle[];

    @ManyToOne(type => Role, role => role.id)
    public role: Role;

    /*
    @ManyToMany(type => Access, access => access.roleId) @JoinTable({ name: ACCESS_ENTITY })
    public access: Access[];*/
}
