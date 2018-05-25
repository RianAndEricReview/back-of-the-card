const Sequelize = require('sequelize')
const db = require('../db')


const ManagersHalf = db.define('managersHalf', {
  playerID: {
    type: Sequelize.STRING,
  },
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
  inseason: {
    type: Sequelize.INTEGER,
  },
  half: {
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
  rank: {
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

module.exports = ManagersHalf
