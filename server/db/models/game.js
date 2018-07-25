const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  currentQuestion: {
    type: Sequelize.INTEGER
  },
  open: {
    type: Sequelize.BOOLEAN
  }
}, {
  defaultScope: {
    include: [{ all: true }]
  }
})

module.exports = Game
