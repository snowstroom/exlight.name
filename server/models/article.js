'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    route: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    carouselItem: DataTypes.INTEGER
  }, {});
  Article.associate = function(models) {
    Article.hasOne(models.CarouselItem, { foreignKey: 'article_id' });
    // associations can be defined here
  };
  return Article;
};