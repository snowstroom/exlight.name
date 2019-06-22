import { AccessNamespace } from '@share/access.namespace';

export class Access implements AccessNamespace.IAccess {
    public id = this.__data.id;
    public roleId = this.__data.roleId;
    public entity = this.__data.entity;
    public access = this.__data.access;

    constructor(private __data: AccessNamespace.IAccess) { }
}
