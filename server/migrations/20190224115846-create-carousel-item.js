'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CarouselItems', {
      articleId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Articles',
          key: 'id'
        }
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('CarouselItems');
  }
};