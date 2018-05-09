const Sequelize = require('sequelize')
const db = require('../db')

const AwardsShareManagers = db.define('awardsShareManagers', {
  awardID: {
    type: Sequelize.STRING
  },
  yearID: {
    type: Sequelize.INTEGER
  },
  lgID: {
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

module.exports = AwardsShareManagers
