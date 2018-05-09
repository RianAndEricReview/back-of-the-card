const Sequelize = require('sequelize')
const db = require('../db')

const Appearances = db.define('appearances', {
  yearID: {
    type: Sequelize.INTEGER
  },
  teamID: {
    type: Sequelize.STRING
  },
  lgID: {
    type: Sequelize.STRING
  },
  playerID: {
    type: Sequelize.STRING
  },
  G_all: {
    type: Sequelize.INTEGER
  },
  GS: {
    type: Sequelize.INTEGER
  },
  G_batting: {
    type: Sequelize.INTEGER
  },
  G_defense: {
    type: Sequelize.INTEGER
  },
  G_p: {
    type: Sequelize.INTEGER
  },
  G_c: {
    type: Sequelize.INTEGER
  },
  G_1b: {
    type: Sequelize.INTEGER
  },
  G_2b: {
    type: Sequelize.INTEGER
  },
  G_3b: {
    type: Sequelize.INTEGER
  },
  G_ss: {
    type: Sequelize.INTEGER
  },
  G_lf: {
    type: Sequelize.INTEGER
  },
  G_cf: {
    type: Sequelize.INTEGER
  },
  G_rf: {
    type: Sequelize.INTEGER
  },
  G_of: {
    type: Sequelize.INTEGER
  },
  G_dh: {
    type: Sequelize.INTEGER
  },
  G_ph: {
    type: Sequelize.INTEGER
  },
  G_pr: {
    type: Sequelize.INTEGER
  }
})

module.exports = Appearances
