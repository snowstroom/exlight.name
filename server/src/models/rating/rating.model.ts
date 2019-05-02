import * as sequelize from 'sequelize';
import { IRatingAtributes, IRatingModel, IRatingInstance } from './rating.interface';

export const ATRIBUTES: sequelize.DefineModelAttributes<IRatingAtributes> = {
    user: {
        type: sequelize.INTEGER
    },
    rating: {
        type: sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        allowNull: false,
        type: sequelize.DATE
    }
};

export function RatingModel(dbase: sequelize.Sequelize): IRatingModel {
    return dbase.define<IRatingInstance, IRatingAtributes>('commentary', ATRIBUTES);
}