import { IAccess, Access } from './access';

export interface IRole {
    id: number;
    name: string;
    description: string;
    access: IAccess[];
}

export class Role implements IRole {
    public id = this.__data.id;
    public description = this.__data.description;
    public name = this.__data.name;
    public access = this.__data.access.map(a => new Access(a));
    constructor(private __data: IRole) { }
}
