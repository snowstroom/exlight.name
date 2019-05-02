import * as sequelize from 'sequelize';
import { ICommentaryAtributes, ICommentaryModel, ICommentaryInstance } from './commentary.interface';

const atributes: sequelize.DefineModelAttributes<ICommentaryAtributes> = {
    commentary: {
        type: sequelize.INTEGER
    },
    body: {
        type: sequelize.STRING,
        allowNull: false,
    },
    user: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    article: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}

export function CommentaryModel(dbase: sequelize.Sequelize): ICommentaryModel {
    return dbase.define<ICommentaryInstance, ICommentaryAtributes>('commentary', atributes);
}
