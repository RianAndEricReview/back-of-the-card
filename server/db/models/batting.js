const Sequelize = require('sequelize')
const db = require('../db')

const Batting = db.define('batting', {
  playerID: {
    type: Sequelize.STRING
  },
  yearID: {
    type: Sequelize.INTEGER
  },
  stint: {
    type: Sequelize.INTEGER
  },
  teamID: {
    type: Sequelize.STRING
  },
  lgID: {
    type: Sequelize.STRING
  },
  G: {
    type: Sequelize.INTEGER
  },
  AB: {
    type: Sequelize.INTEGER
  },
  R: {
    type: Sequelize.INTEGER
  },
  H: {
    type: Sequelize.INTEGER
  },
  _2B: {
    type: Sequelize.INTEGER
  },
  _3B: {
    type: Sequelize.INTEGER
  },
  HR: {
    type: Sequelize.INTEGER
  },
  RBI: {
    type: Sequelize.INTEGER
  },
  SB: {
    type: Sequelize.INTEGER
  },
  CS: {
    type: Sequelize.INTEGER
  },
  BB: {
    type: Sequelize.INTEGER
  },
  SO: {
    type: Sequelize.INTEGER
  },
  IBB: {
    type: Sequelize.INTEGER
  },
  HBP: {
    type: Sequelize.INTEGER
  },
  SH: {
    type: Sequelize.INTEGER
  },
  SF: {
    type: Sequelize.INTEGER
  },
  GIDP: {
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
}, { timestamps: true })

module.exports = Batting
