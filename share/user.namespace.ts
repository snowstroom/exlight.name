export namespace UserNamespace {
  export interface IUser {
    id?: number;
    email: string;
    firstname: string;
    secondname: string;
    password?: string;
    roleId: number;
  }
}
