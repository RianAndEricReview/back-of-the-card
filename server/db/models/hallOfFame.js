const Sequelize = require('sequelize')
const db = require('../db')

//changed yearid to yearID for consistency, need to update CSV

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
  needed_note: {
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
