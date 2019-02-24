'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarouselItem = sequelize.define('CarouselItem', {
    imgUrl: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  CarouselItem.associate = function(models) {
    // associations can be defined here
  };
  return CarouselItem;
};