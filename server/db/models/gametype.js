const Sequelize = require('sequelize')
const db = require('../db')

const Gametype = db.define('gametype', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  maxPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  secondsPerRound: {
    type: Sequelize.FLOAT,
    allowNull: false,
    default: 20,
  },
  numOfQuestions: {
    type: Sequelize.INTEGER,
    default: 10,
  },
  scoreSystem: {
    type: Sequelize.ENUM('countDown', 'buzzIn', 'right-wrong', 'answerOrder'),
    default: 'right-wrong',
  },
  winningScore: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Gametype
