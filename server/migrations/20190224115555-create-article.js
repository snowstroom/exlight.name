'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      route: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      publicationDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      views: {
        type: Sequelize.INTEGER
      },
      carouselId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: 'CarouselItems',
          key: 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};