const Sequelize = require('sequelize')
const db = require('../db')


const Salaries = db.define('salaries', {
  yearID: {
    type: Sequelize.INTEGER,
  },
  teamID: {
    type: Sequelize.STRING,
  },
  lgID: {
    type: Sequelize.STRING,
  },
  playerID: {
    type: Sequelize.STRING,
  },
  salary: {
    type: Sequelize.INTEGER,
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

module.exports = Salaries
