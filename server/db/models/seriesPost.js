const Sequelize = require('sequelize')
const db = require('../db')


const SeriesPost = db.define('seriesPost', {
  year: {
    type: Sequelize.INTEGER,
  },
  round: {
    type: Sequelize.STRING,
  },
  teamIDWinner: {
    type: Sequelize.STRING,
  },
  lgWinner: {
    type: Sequelize.STRING,
  },
  teamIDLoser: {
    type: Sequelize.STRING,
  },
  lgLoser: {
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
