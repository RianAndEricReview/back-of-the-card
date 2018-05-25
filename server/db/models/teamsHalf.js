const Sequelize = require('sequelize')
const db = require('../db')


const TeamsHalf = db.define('teamsHalf', {
  year: {
    type: Sequelize.INTEGER,
  },
  league: {
    type: Sequelize.STRING,
  },
  team: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING,
  },
  half: {
    type: Sequelize.INTEGER,
  },
  div: {
    type: Sequelize.STRING,
  },
  divWin: {
    type: Sequelize.STRING,
  },
  Rank: {
    type: Sequelize.INTEGER,
  },
  games: {
    type: Sequelize.INTEGER,
  },
  wins: {
    type: Sequelize.INTEGER,
  },
  loses: {
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
