const Sequelize = require('sequelize')
const db = require('../db')

const PlayerQuestionResult = db.define('playerQuestionResult', {
  chosenAnswer: {
    type: Sequelize.STRING
  },
  secondsToAnswer: {
    type: Sequelize.FLOAT
  }
})

module.exports = PlayerQuestionResult
