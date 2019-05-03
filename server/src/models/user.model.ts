import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail } from 'class-validator';
export interface IUser {
    id?: number;
    email: string;
    firstname: string;
    secondname: string;
    password: string;
    // roleId: number;
}

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn() public id: number;
    @IsEmail()
    @Column({
        unique: true,
        nullable: false,
    }) public email: string;
    @Column() public firstname: string;
    @Column() public secondname: string;
    @Column({ nullable: false }) public password: string;
}
