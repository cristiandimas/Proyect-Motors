const { DataTypes } = require('sequelize');
const { db } = require('../database/db');


const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type:DataTypes.STRING,
    allowNull: false,
    enum: ['client', 'employee']
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
    enum: ['available', 'unavailable']
  }

});
module.exports = Users;