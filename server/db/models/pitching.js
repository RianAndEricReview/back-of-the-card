const Sequelize = require('sequelize')
const db = require('../db')


const Pitching = db.define('pitching', {
  playerID: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
  },
  stint: {
    type: Sequelize.INTEGER,
  },
  team: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING,
  },
  league: {
    type: Sequelize.STRING,
  },
  wins: {
    type: Sequelize.INTEGER,
  },
  loses: {
    type: Sequelize.INTEGER,
  },
  games: {
    type: Sequelize.INTEGER,
  },
  GS: {
    type: Sequelize.INTEGER,
  },
  CG: {
    type: Sequelize.INTEGER,
  },
  SHO: {
    type: Sequelize.INTEGER,
  },
  SV: {
    type: Sequelize.INTEGER,
  },
  IPouts: {
    type: Sequelize.INTEGER,
  },
  hits: {
    type: Sequelize.INTEGER,
  },
  ER: {
    type: Sequelize.INTEGER,
  },
  HR: {
    type: Sequelize.INTEGER,
  },
  BB: {
    type: Sequelize.INTEGER,
  },
  SO: {
    type: Sequelize.INTEGER,
  },
  BAOpp: {
    type: Sequelize.FLOAT,
  },
  ERA: {
    type: Sequelize.FLOAT,
  },
  IBB: {
    type: Sequelize.INTEGER,
  },
  WP: {
    type: Sequelize.INTEGER,
  },
  HBP: {
    type: Sequelize.INTEGER,
  },
  BK: {
    type: Sequelize.INTEGER,
  },
  BFP: {
    type: Sequelize.INTEGER,
  },
  GF: {
    type: Sequelize.INTEGER,
  },
  runs: {
    type: Sequelize.INTEGER,
  },
  SH: {
    type: Sequelize.INTEGER,
  },
  SF: {
    type: Sequelize.INTEGER,
  },
  GIDP: {
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

module.exports = Pitching
