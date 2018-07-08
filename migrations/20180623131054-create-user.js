'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      index: {
        type: Sequelize.INTEGER
      },
      guid: {
        type: Sequelize.UUID
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      balance: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      eyeColor: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      encryptedPass: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      registered: {
        type: Sequelize.DATE
      },
      greeting: {
        type: Sequelize.STRING
      },
      favoriteFruit: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};