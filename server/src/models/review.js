'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
      user_id: DataTypes.INTEGER,
      review: DataTypes.INTEGER,
      data: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};