const Sequelize = require('sequelize')
const db = require('../db')


const Salaries = db.define('salaries', {
  year: {
    type: Sequelize.INTEGER,
  },
  teamName: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING,
  },
  league: {
    type: Sequelize.STRING,
  },
  player: {
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
