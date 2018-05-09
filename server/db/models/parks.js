const Sequelize = require('sequelize')
const db = require('../db')


const Parks = db.define('parks', {
  'park.key': {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  'park.name': {
    type: Sequelize.STRING,
  },
  'park.alias': {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  country: {
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

module.exports = Parks
