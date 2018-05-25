const Sequelize = require('sequelize')
const db = require('../db')

const Appearances = db.define('appearances', {
  year: {
    type: Sequelize.INTEGER
  },
  team: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING
  },
  league: {
    type: Sequelize.STRING
  },
  playerID: {
    type: Sequelize.STRING
  },
  totalGamesPlayed: {
    type: Sequelize.INTEGER
  },
  gamesStarted: {
    type: Sequelize.INTEGER
  },
  gamesPlayerBatted: {
    type: Sequelize.INTEGER
  },
  gamesPlayedDefense: {
    type: Sequelize.INTEGER
  },
  gamesAsPitcher: {
    type: Sequelize.INTEGER
  },
  gamesAsCatcher: {
    type: Sequelize.INTEGER
  },
  gamesAs1B: {
    type: Sequelize.INTEGER
  },
  gamesAs2B: {
    type: Sequelize.INTEGER
  },
  gamesAs3B: {
    type: Sequelize.INTEGER
  },
  gamesAsSS: {
    type: Sequelize.INTEGER
  },
  gamesAsLF: {
    type: Sequelize.INTEGER
  },
  gamesAsCF: {
    type: Sequelize.INTEGER
  },
  gamesAsRF: {
    type: Sequelize.INTEGER
  },
  gamesAsOF: {
    type: Sequelize.INTEGER
  },
  gamesAsDH: {
    type: Sequelize.INTEGER
  },
  gamesAsPH: {
    type: Sequelize.INTEGER
  },
  gamesAsPR: {
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

module.exports = Appearances
