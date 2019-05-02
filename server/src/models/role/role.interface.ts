import * as sequelize from 'sequelize';

export interface IRoleAtributes {
    id?: number;
    name: string;
}

export interface IRoleInstance extends sequelize.Instance<IRoleAtributes> { }

export interface IRoleModel extends sequelize.Model<IRoleInstance, IRoleAtributes>, IRoleAtributes { }
