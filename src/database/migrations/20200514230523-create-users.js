'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          isEmail: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          select: false,
        },
        passwordresettoken: {
          type: Sequelize.STRING,
          defalValue: 'data',
          allowNull: true,
        },
        passwordresetexpires: {
          type: Sequelize.STRING,
          defalValue: 'data',
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
