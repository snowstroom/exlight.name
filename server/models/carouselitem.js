'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarouselItem = sequelize.define('CarouselItem', {
    articleId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    imgUrl: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  CarouselItem.associate = function(models) {
    CarouselItem.belongsTo(models.Article, { foreignKey: 'articleId',  as: 'article' })
  };
  return CarouselItem;
};