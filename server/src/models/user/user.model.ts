import * as sequelize from 'sequelize';
import { IUserAtributes, IUserModel, IUserInstance } from './user.interface';
import { RatingModel } from '../rating/rating.model';
import { CommentaryModel } from '../commentary/commentary.model';
import { ArticleModel } from '../article/article.model';

const atributes: sequelize.DefineModelAttributes<IUserAtributes> = {
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    fistname: {
        type: sequelize.STRING
    },
    secondname: {
        type: sequelize.STRING
    },
    roleId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}

export function UserModel(dbase: sequelize.Sequelize): IUserModel {
    const user = dbase.define<IUserInstance, IUserAtributes>('user', atributes);
    user.hasMany(RatingModel(dbase));
    user.hasMany(CommentaryModel(dbase));
    user.belongsTo(ArticleModel(dbase), { foreignKey: 'author' });
    return user;
}