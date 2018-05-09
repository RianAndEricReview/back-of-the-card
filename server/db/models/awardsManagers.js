const Sequelize = require('sequelize')
const db = require('../db')

const AwardsManagers = db.define('awardsManagers', {
  playerID: {
    type: Sequelize.STRING,
    primaryKey: true,
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

module.exports = AwardsManagers
