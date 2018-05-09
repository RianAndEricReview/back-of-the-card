const Sequelize = require('sequelize')
const db = require('../db')

const AwardsPlayers = db.define('awardsPlayers', {
  playerID: {
    type: Sequelize.STRING
  },
  award: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  league: {
    type: Sequelize.STRING
  },
  tie: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
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

module.exports = AwardsPlayers
