const Sequelize = require('sequelize')
const db = require('../db')


const Managers = db.define('managers', {
  playerID: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
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
  plyrMgr: {
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

module.exports = Managers
