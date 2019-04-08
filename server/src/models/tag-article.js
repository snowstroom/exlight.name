'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('TagArticle', {
      name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};