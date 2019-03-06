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
    Article.belongsTo(models.Category, { foreignKey: {
      name: 'categoryId',
      allowNull: false
    }});
    Article.hasOne(models.CarouselItem, { foreignKey: {
      name: 'articleId'
    }})
  };
  return Article;
};