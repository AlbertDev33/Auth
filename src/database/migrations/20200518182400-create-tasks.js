'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('tasks', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false, 
        },
        project_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'projects', key: 'id' },
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defautValue: false,
            allowNull: false,
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
      return queryInterface.dropTable('tasks');
  }
};
