const Sequelize = require('sequelize')
const db = require('../db')


const Managers = db.define('managers', {
  playerID: {
    type: Sequelize.STRING,
  },
  yearID: {
    type: Sequelize.INTEGER,
  },
  teamID: {
    type: Sequelize.STRING,
  },
  lgID: {
    type: Sequelize.STRING,
  },
  inseason: {
    type: Sequelize.INTEGER,
  },
  G: {
    type: Sequelize.INTEGER,
  },
  W: {
    type: Sequelize.INTEGER,
  },
  L: {
    type: Sequelize.INTEGER,
  },
  rank: {
    type: Sequelize.INTEGER,
  },
  plyrMgr: {
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

module.exports = Managers
