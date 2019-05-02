import * as sequelize from 'sequelize';
import { ITagAtributes, ITagModel, ITagInstance, ITagOfArticleAtributes, ITagOfArticleInstance, ITagOfArticleModel } from './tag.interface';

const tagAtr: sequelize.DefineModelAttributes<ITagAtributes> = {
    name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
};

export function TagModel(dbase: sequelize.Sequelize): ITagModel {
    const tag = dbase.define<ITagInstance, ITagAtributes>('tag', tagAtr);
    tag.hasMany(TagOfArticle(dbase));
    return tag;
}

const tagOfArt: sequelize.DefineModelAttributes<ITagOfArticleAtributes> = {
    article: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    tag: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}

export function TagOfArticle(dbase: sequelize.Sequelize): ITagOfArticleModel {
    const tagOfArticle = dbase.define<ITagOfArticleInstance, ITagOfArticleAtributes>('tag_of_article', tagOfArt);
    tagOfArticle.belongsTo(TagModel(dbase), { foreignKey: 'tag' } );
    return tagOfArticle;
}
