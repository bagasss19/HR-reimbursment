'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Reimbursments', // name of Source model
      'employee_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Reimbursments', // name of Source model
      'id' // key we want to remove
    )
  }
};
