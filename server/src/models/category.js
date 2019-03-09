'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: DataTypes.STRING,
    categoryRoute: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Article, { as: 'category', foreignKey: 'categoryId' });
  };
  return Category;
};