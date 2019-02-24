'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoItem = sequelize.define('PhotoItem', {
    imgUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    views: DataTypes.INTEGER
  }, {});
  PhotoItem.associate = function(models) {
    // associations can be defined here
  };
  return PhotoItem;
};