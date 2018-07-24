const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  question: {
    type: Sequelize.TEXT
  },
  answers: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  correctAnswer: {
    type: Sequelize.STRING
  }
})

module.exports = Question
