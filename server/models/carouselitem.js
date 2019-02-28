'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarouselItem = sequelize.define('CarouselItem', {
    imgUrl: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    articleId: DataTypes.INTEGER
  }, {});
  CarouselItem.associate = function(models) {
    CarouselItem.hasOne(models.Article, { foreignKey: 'id' })
  };
  return CarouselItem;
};