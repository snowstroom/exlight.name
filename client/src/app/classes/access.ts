export interface IAccess {
    id?: number;
    roleId: number;
    entity: string;
    access: number;
}

export class Access implements IAccess {
    public id = this.__data.id;
    public roleId = this.__data.roleId;
    public entity = this.__data.entity;
    public access = this.__data.access;

    constructor(private __data: IAccess) { }
}
