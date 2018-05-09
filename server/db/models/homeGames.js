const Sequelize = require('sequelize')
const db = require('../db')

//do we want to update the '.' formatted names? Would need to update the CSV as well.

const HomeGames = db.define('homeGames', {
  'year.key': {
    type: Sequelize.INTEGER,
  },
  'league.key': {
    type: Sequelize.STRING,
  },
  'team.key': {
    type: Sequelize.STRING,
  },
  'park.key': {
    type: Sequelize.STRING,
  },
  'span.first': {
    type: Sequelize.DATEONLY,
  },
  'span.last': {
    type: Sequelize.DATEONLY,
  },
  games: {
    type: Sequelize.INTEGER,
  },
  openings: {
    type: Sequelize.INTEGER,
  },
  attendance: {
    type: Sequelize.INTEGER,
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

module.exports = HomeGames
