const { DataTypes } = require('sequelize');
const { db } = require('../database/db');
const Repairs = require('./repairs.model');

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
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
    defaultValue: 'client',
  },
  paswordChangedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available',
  },
});

Users.hasMany(Repairs, {
  foreignKey: 'userId',
  sourceKey: 'id',
});
Repairs.belongsTo(Users, {
  foreignKey: 'userId',
  targetKey: 'id',
});
module.exports = Users;
