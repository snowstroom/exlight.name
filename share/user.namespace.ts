import { ApiNamespace } from './api.namespace';
export namespace UserNamespace {
  export interface IUser {
    id?: number;
    email: string;
    firstname: string;
    secondname: string;
    password?: string;
    roleId: number;
  }

  export interface IUserApiList extends ApiNamespace.IApiList {
    roleId: number;
  }
}
