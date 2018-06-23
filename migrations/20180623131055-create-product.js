'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      index: {
        type: Sequelize.INTEGER
      },
      isAvailable: {
        type: Sequelize.BOOLEAN
      },
      productName: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      produced: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Products');
  }
};