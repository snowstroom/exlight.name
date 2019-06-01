import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
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
}
