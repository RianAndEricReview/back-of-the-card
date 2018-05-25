const Sequelize = require('sequelize')
const db = require('../db')

const BattingPost = db.define('battingPost', {
  year: {
    type: Sequelize.INTEGER
  },
  round: {
    type: Sequelize.STRING
  },
  playerID: {
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
  games: {
    type: Sequelize.INTEGER
  },
  AB: {
    type: Sequelize.INTEGER
  },
  runs: {
    type: Sequelize.INTEGER
  },
  hits: {
    type: Sequelize.INTEGER
  },
  '2B': {
    type: Sequelize.INTEGER
  },
  '3B': {
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

module.exports = BattingPost
