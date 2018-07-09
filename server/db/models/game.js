const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  players: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  defaultScope: {
    include: [{ all: true }]
  }
})

module.exports = Game