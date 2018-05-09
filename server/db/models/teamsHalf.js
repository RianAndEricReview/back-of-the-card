const Sequelize = require('sequelize')
const db = require('../db')


const TeamsHalf = db.define('teamsHalf', {
  yearID: {
    type: Sequelize.INTEGER,
  },
  lgID: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING,
  },
  half: {
    type: Sequelize.INTEGER,
  },
  divID: {
    type: Sequelize.STRING,
  },
  divWin: {
    type: Sequelize.STRING,
  },
  Rank: {
    type: Sequelize.INTEGER,
  },
  G: {
    type: Sequelize.INTEGER,
  },
  W: {
    type: Sequelize.INTEGER,
  },
  L: {
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

module.exports = TeamsHalf
