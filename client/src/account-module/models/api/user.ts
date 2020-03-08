import { UserNamespace } from '@share/';

export class UserApi implements UserNamespace.IUser {
  public id = 0;
  public email = '';
  public firstname = '';
  public secondname = '';
  public roleId = 0;
  public avatar = '';

  private __data: Partial<UserNamespace.IUser> = {};

  constructor(__data?: Partial<UserNamespace.IUser>) {
    if (__data) {
      this.id = __data.id;
      this.email = __data.email;
      this.firstname = __data.firstname;
      this.secondname = __data.secondname;
      this.roleId = __data.roleId;
      this.__data = __data;
    }
  }

  get userName(): string {
    return `${this.firstname} ${this.secondname}`;
  }
}
