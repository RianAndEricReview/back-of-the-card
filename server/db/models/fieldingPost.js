const Sequelize = require('sequelize')
const db = require('../db')

const FieldingPost = db.define('fieldingPost', {
  playerID: {
    type: Sequelize.STRING
  },
  yearID: {
    type: Sequelize.INTEGER
  },
  teamID: {
    type: Sequelize.STRING
  },
  lgID: {
    type: Sequelize.STRING
  },
  round: {
    type: Sequelize.STRING
  },
  Pos: {
    type: Sequelize.STRING
  },
  G: {
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
  A: {
    type: Sequelize.INTEGER
  },
  E: {
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
