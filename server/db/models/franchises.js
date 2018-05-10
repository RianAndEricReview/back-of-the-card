const Sequelize = require('sequelize')
const db = require('../db')


const Franchises = db.define('franchises', {
  franchID: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.STRING,
  },
  NAassoc: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW')
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.fn('NOW')
  }
}, {timestamps: true})

module.exports = Franchises
