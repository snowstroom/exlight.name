import * as sequelize from 'sequelize';

export interface IUserAtributes {
    id?: number;
    email: string;
    fistname: string;
    secondname: string;
    roleId: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserInstance extends sequelize.Instance<IUserAtributes> { }

export interface IUserModel extends sequelize.Model<IUserInstance, IUserAtributes> { }
