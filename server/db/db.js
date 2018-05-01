const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/PLACEHOLDER_DB_NAME', {
  logging: false
})

module.exports = db
