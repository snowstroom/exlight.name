'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    route: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    views: DataTypes.INTEGER
  }, {});
  Article.associate = function(models) {
    models.Article.belongTo(models.Category, { foreignKey: {
      name: 'categoryId',
      allowNull: false
    }});
    models.Article.hasOne(models.CarouselItem, { foreignKey: {
      name: 'articleId'
    }})
  };
  return Article;
};