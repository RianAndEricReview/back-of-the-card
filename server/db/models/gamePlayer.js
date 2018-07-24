const Sequelize = require('sequelize')
const db = require('../db')

const GamePlayer = db.define('gamePlayer', {
  gameScore: {
    type: Sequelize.INTEGER
  },
  finishPosition: {
    type: Sequelize.INTEGER
  }
})

module.exports = GamePlayer
