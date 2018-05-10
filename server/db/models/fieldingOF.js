const Sequelize = require('sequelize')
const db = require('../db')

const FieldingOF = db.define('fieldingOF', {
  playerID: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  stint: {
    type: Sequelize.INTEGER
  },
  GLF: {
    type: Sequelize.INTEGER
  },
  GCF: {
    type: Sequelize.INTEGER
  },
  GRF: {
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

module.exports = FieldingOF
