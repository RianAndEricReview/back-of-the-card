const Sequelize = require('sequelize')
const db = require('../db')


const SeriesPost = db.define('seriesPost', {
  yearID: {
    type: Sequelize.INTEGER,
  },
  round: {
    type: Sequelize.STRING,
  },
  teamIDwinner: {
    type: Sequelize.STRING,
  },
  lgIDwinner: {
    type: Sequelize.STRING,
  },
  teamIDloser: {
    type: Sequelize.STRING,
  },
  lgIDloser: {
    type: Sequelize.STRING,
  },
  wins: {
    type: Sequelize.INTEGER,
  },
  losses: {
    type: Sequelize.INTEGER,
  },
  ties: {
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

module.exports = SeriesPost
