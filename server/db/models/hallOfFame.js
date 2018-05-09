const Sequelize = require('sequelize')
const db = require('../db')

const HallOfFame = db.define('hallOfFame', {
  playerID: {
    type: Sequelize.STRING,
  },
  yearID: {
    type: Sequelize.INTEGER,
  },
  votedBy: {
    type: Sequelize.STRING,
  },
  ballots: {
    type: Sequelize.INTEGER,
  },
  needed: {
    type: Sequelize.INTEGER,
  },
  votes: {
    type: Sequelize.INTEGER,
  },
  inducted: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  neededNote: {
    type: Sequelize.STRING,
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

module.exports = HallOfFame
