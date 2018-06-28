const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  maxPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  players: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Game
