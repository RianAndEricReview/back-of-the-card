const Sequelize = require('sequelize')
const db = require('../db')

const People = db.define('people', {
  playerID: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  birthYear: {
    type: Sequelize.INTEGER,
  },
  birthMonth: {
    type: Sequelize.INTEGER,
  },
  birthDay: {
    type: Sequelize.INTEGER,
  },
  birthCountry: {
    type: Sequelize.STRING,
  },
  birthState: {
    type: Sequelize.STRING,
  },
  birthCity: {
    type: Sequelize.STRING,
  },
  deathYear: {
    type: Sequelize.INTEGER,
  },
  deathMonth: {
    type: Sequelize.INTEGER,
  },
  deathDay: {
    type: Sequelize.INTEGER,
  },
  deathCountry: {
    type: Sequelize.STRING,
  },
  deathState: {
    type: Sequelize.STRING,
  },
  deathCity: {
    type: Sequelize.STRING,
  },
  nameFirst: {
    type: Sequelize.STRING,
  },
  nameLast: {
    type: Sequelize.STRING,
  },
  nameGiven: {
    type: Sequelize.STRING,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  height: {
    type: Sequelize.INTEGER,
  },
  bats: {
    type: Sequelize.STRING,
  },
  throws: {
    type: Sequelize.STRING,
  },
  debut: {
    type: Sequelize.DATEONLY,
  },
  finalGame: {
    type: Sequelize.DATEONLY,
  },
  retroID: {
    type: Sequelize.STRING,
  },
  bbrefID: {
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

module.exports = People
