const Sequelize = require('sequelize')
const db = require('../db')

const FieldingOF = db.define('fieldingOF', {
  playerID: {
    type: Sequelize.STRING
  },
  yearID: {
    type: Sequelize.INTEGER
  },
  stint: {
    type: Sequelize.INTEGER
  },
  Glf: {
    type: Sequelize.INTEGER
  },
  Gcf: {
    type: Sequelize.INTEGER
  },
  Grf: {
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
