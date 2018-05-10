const Sequelize = require('sequelize')
const db = require('../db')


const Teams = db.define('teams', {
  year: {
    type: Sequelize.INTEGER,
  },
  league: {
    type: Sequelize.STRING,
  },
  teamID: {
    type: Sequelize.STRING,
  },
  franchID: {
    type: Sequelize.STRING,
  },
  div: {
    type: Sequelize.STRING,
  },
  rank: {
    type: Sequelize.INTEGER,
  },
  games: {
    type: Sequelize.INTEGER,
  },
  Ghome: {
    type: Sequelize.INTEGER,
  },
  wins: {
    type: Sequelize.INTEGER,
  },
  loses: {
    type: Sequelize.INTEGER,
  },
  DivWin: {
    type: Sequelize.STRING,
  },
  WCWin: {
    type: Sequelize.STRING,
  },
  LgWin: {
    type: Sequelize.STRING,
  },
  WSWin: {
    type: Sequelize.STRING,
  },
  runs: {
    type: Sequelize.INTEGER,
  },
  AB: {
    type: Sequelize.INTEGER,
  },
  hits: {
    type: Sequelize.INTEGER,
  },
  '2B': {
    type: Sequelize.INTEGER,
  },
  '3B': {
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
  SB: {
    type: Sequelize.INTEGER,
  },
  CS: {
    type: Sequelize.INTEGER,
  },
  HBP: {
    type: Sequelize.INTEGER,
  },
  SF: {
    type: Sequelize.INTEGER,
  },
  RA: {
    type: Sequelize.INTEGER,
  },
  ER: {
    type: Sequelize.INTEGER,
  },
  ERA: {
    type: Sequelize.FLOAT,
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
  HA: {
    type: Sequelize.INTEGER,
  },
  BBA: {
    type: Sequelize.INTEGER,
  },
  SOA: {
    type: Sequelize.INTEGER,
  },
  errors: {
    type: Sequelize.INTEGER,
  },
  DP: {
    type: Sequelize.INTEGER,
  },
  FP: {
    type: Sequelize.FLOAT,
  },
  name: {
    type: Sequelize.STRING,
  },
  park: {
    type: Sequelize.STRING,
  },
  attendance: {
    type: Sequelize.INTEGER,
  },
  BPF: {
    type: Sequelize.INTEGER,
  },
  PPF: {
    type: Sequelize.INTEGER,
  },
  teamIDBR: {
    type: Sequelize.STRING,
  },
  teamIDlahman45: {
    type: Sequelize.STRING,
  },
  teamIDretro: {
    type: Sequelize.STRING,
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

module.exports = Teams
