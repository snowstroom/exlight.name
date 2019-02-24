'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    views: DataTypes.INTEGER
  }, {});
  Video.associate = function(models) {
    // associations can be defined here
  };
  return Video;
};