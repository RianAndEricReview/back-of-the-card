const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const GamePlayer = db.define('gamePlayer', {
  gameScore: {
    type: Sequelize.INTEGER
  },
  finishPosition: {
    type: Sequelize.INTEGER
  }
}, {
  defaultScope: {
    include: [{model: User}]
  }
})

module.exports = GamePlayer
