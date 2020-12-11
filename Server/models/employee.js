'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.hasMany(models.Reimbursment, {foreignKey: 'employee_id', targetKey: 'id'})
    }
  };
  Employee.init({
    employee_id: DataTypes.INTEGER,
    employee_name: DataTypes.STRING,
    employee_role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
    hooks : {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
        if (!user.employee_role) {
           user.employee_role = 'Employee' 
        }
      }
    }
  });
  return Employee;
};