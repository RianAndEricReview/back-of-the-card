const Sequelize = require('sequelize')
const db = require('../db')

const AwardsSharePlayers = db.define('awardsSharePlayers', {
  award: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  league: {
    type: Sequelize.STRING
  },
  playerID: {
    type: Sequelize.STRING
  },
  pointsWon: {
    type: Sequelize.INTEGER
  },
  pointsMax: {
    type: Sequelize.INTEGER
  },
  votesFirst: {
    type: Sequelize.INTEGER
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

module.exports = AwardsSharePlayers
