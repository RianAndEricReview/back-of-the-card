const Sequelize = require('sequelize')
const db = require('../db')

const AllstarFull = db.define('allstarFull', {
  playerID: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  gameNum: {
    type: Sequelize.INTEGER
  },
  gameID: {
    type: Sequelize.STRING
  },
  teamName: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING
  },
  league: {
    type: Sequelize.STRING
  },
  playedInGame: {
    type: Sequelize.INTEGER
  },
  startingPos: {
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

module.exports = AllstarFull
