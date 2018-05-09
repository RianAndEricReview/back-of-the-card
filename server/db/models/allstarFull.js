const Sequelize = require('sequelize')
const db = require('../db')

const AllstarFull = db.define('allstarFull', {
  playerID: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  yearID: {
    type: Sequelize.INTEGER
  },
  gameNum: {
    type: Sequelize.INTEGER
  },
  gameID: {
    type: Sequelize.STRING
  },
  teamID: {
    type: Sequelize.STRING
  },
  lgID: {
    type: Sequelize.STRING
  },
  GP: {
    type: Sequelize.INTEGER
  },
  startingPos: {
    type: Sequelize.INTEGER
  }
})

module.exports = AllstarFull
