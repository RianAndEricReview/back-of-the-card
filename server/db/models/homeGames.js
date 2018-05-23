const Sequelize = require('sequelize')
const db = require('../db')

const HomeGames = db.define('homeGames', {
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
  parkID: {
    type: Sequelize.STRING,
  },
  spanFirst: {
    type: Sequelize.DATEONLY,
  },
  spanLast: {
    type: Sequelize.DATEONLY,
  },
  games: {
    type: Sequelize.INTEGER,
  },
  openings: {
    type: Sequelize.INTEGER,
  },
  attendance: {
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

module.exports = HomeGames
