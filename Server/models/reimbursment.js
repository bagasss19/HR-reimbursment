'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reimbursment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reimbursment.belongsTo(models.Employee, {foreignKey: 'employee_id', targetKey: 'id'})
    }
  };
  Reimbursment.init({
    category : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "password cannot be empty!"
        }
      }
    },
    amount: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args:[0],
          msg:"Minimum amount is 0!"
         }
      }
    },
    attachment: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reimbursment',
    hooks : {
      beforeCreate: (user, options) => {
        user.status = "Waiting"
      }
    }
  });
  return Reimbursment;
};