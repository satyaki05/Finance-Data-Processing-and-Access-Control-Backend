const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Record = sequelize.define('Record', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // income or expense
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  notes: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
});

module.exports = Record;