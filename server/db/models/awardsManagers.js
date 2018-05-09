const Sequelize = require('sequelize')
const db = require('../db')

const AwardsManagers = db.define('awardsManagers', {
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

module.exports = AwardsManagers
