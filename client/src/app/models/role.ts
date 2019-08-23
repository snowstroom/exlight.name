import { Access } from './access';
import { AccessNamespace } from '@share/';

export class Role implements AccessNamespace.IRole {
    public id = this.__data.id;
    public description = this.__data.description;
    public name = this.__data.name;
    public access = this.__data.access.map(a => new Access(a));
    constructor(private __data: AccessNamespace.IRole) { }
}
