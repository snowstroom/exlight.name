import { UserNamespace } from '@share/';

export class User implements UserNamespace.IUser {
    public id = this.__data.id;
    public email = this.__data.email;
    public firstname = this.__data.firstname;
    public secondname = this.__data.secondname;
    public roleId = this.__data.roleId;

    constructor(private __data: Partial<UserNamespace.IUser>) { }
}
