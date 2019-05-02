import * as sequelize from 'sequelize';

export interface IRatingAtributes {
    id?: number;
    user: number;
    rating: number;
    
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IRatingInstance extends sequelize.Instance<IRatingAtributes>, IRatingAtributes { }

export interface IRatingModel extends sequelize.Model<IRatingInstance, IRatingAtributes> { }