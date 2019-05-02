import * as sequelize from 'sequelize';
import { IArticleModel, IArticleInstance, IArticleAtributes } from './article.interface';
import { CategoryModel } from '../category/category.model';
import { CommentaryModel } from '../commentary/commentary.model';
import { UserModel } from '../user/user.model';
import { TagModel, TagOfArticle } from '../tag/tag.model';

const atributes: sequelize.DefineModelAttributes<IArticleAtributes> = {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    route: {
        type: sequelize.STRING,
        allowNull: false
    },
    dateOfPublic: {
        type: sequelize.DATE,
        defaultValue: new Date()
    },
    description: {
        type: sequelize.STRING,
        allowNull: false
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false
    },
    categoryId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    author: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    previewImgUrl: {
        type: sequelize.STRING,
        allowNull: false
    },
    views: {
        type: sequelize.INTEGER
    }
};

export function ArticleModel(dbase: sequelize.Sequelize): IArticleModel {
    const article = dbase.define<IArticleInstance, IArticleAtributes>('article', atributes);
    const catModel = CategoryModel(dbase);
    article.hasMany(CommentaryModel(dbase));
    article.hasOne(UserModel(dbase));
    article.belongsTo(catModel, { foreignKey: 'categoryId' });
    article.belongsToMany(TagModel(dbase), { through: 'tag_of_article'});
    return article;
}