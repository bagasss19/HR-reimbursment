'use strict';
const {hashPassword} = require('../helper/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', [{
      employee_id : 1,
      password : hashPassword("bagas123"),
      employee_name : "bagas",
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
