export interface IUser {
    id?: number;
    email: string;
    firstname: string;
    secondname: string;
}

export class User implements IUser {
    public id = this.__data.id;
    public email = this.__data.email;
    public firstname = this.__data.firstname;
    public secondname = this.__data.secondname;

    constructor(private __data: Partial<IUser>) { }
}
