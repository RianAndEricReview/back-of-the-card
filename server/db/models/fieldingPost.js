const Sequelize = require('sequelize')
const db = require('../db')

const FieldingPost = db.define('fieldingPost', {
  playerID: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  teamID: {
    type: Sequelize.STRING
  },
  league: {
    type: Sequelize.STRING
  },
  round: {
    type: Sequelize.STRING
  },
  position: {
    type: Sequelize.STRING
  },
  games: {
    type: Sequelize.INTEGER
  },
  GS: {
    type: Sequelize.INTEGER
  },
  InnOuts: {
    type: Sequelize.INTEGER
  },
  PO: {
    type: Sequelize.INTEGER
  },
  assists: {
    type: Sequelize.INTEGER
  },
  errors: {
    type: Sequelize.INTEGER
  },
  DP: {
    type: Sequelize.INTEGER
  },
  TP: {
    type: Sequelize.INTEGER
  },
  PB: {
    type: Sequelize.INTEGER
  },
  SB: {
    type: Sequelize.INTEGER
  },
  CS: {
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

module.exports = FieldingPost
