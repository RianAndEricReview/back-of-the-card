const Sequelize = require('sequelize')
const db = require('../db')

const AwardsPlayers = db.define('awardsPlayers', {
  playerID: {
    type: Sequelize.STRING
  },
  awardID: {
    type: Sequelize.STRING
  },
  yearID: {
    type: Sequelize.INTEGER
  },
  lgID: {
    type: Sequelize.STRING
  },
  tie: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  },
})

module.exports = AwardsPlayers
