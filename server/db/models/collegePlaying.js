const Sequelize = require('sequelize')
const db = require('../db')

const CollegePlaying = db.define('collegePlaying', {
  playerID: {
    type: Sequelize.STRING
  },
  schoolID: {
    type: Sequelize.STRING
  },
  year: {
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

module.exports = CollegePlaying
