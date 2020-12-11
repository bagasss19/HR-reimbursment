'use strict';
const {hashPassword} = require('../helper/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', [{
      employee_id : 100,
      password : hashPassword("admin123"),
      employee_name : "admin",
      employee_role : "admin",
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
