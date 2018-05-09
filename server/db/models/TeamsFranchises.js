const Sequelize = require('sequelize')
const db = require('../db')


const TeamsFranchises = db.define('teamsFranchises', {
  franchID: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  franchName: {
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

module.exports = TeamsFranchises
