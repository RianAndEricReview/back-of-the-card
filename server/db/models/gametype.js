const Sequelize = require('sequelize')
const db = require('../db')

const Gametype = db.define('gametype', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: Sequelize.STRING,
  },
  maxPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  secondsPerRound: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 20,
  },
  numOfQuestions: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
  },
  scoreSystem: {
    type: Sequelize.ENUM('countDown', 'buzzIn', 'right-wrong', 'answerOrder'),
    defaultValue: 'right-wrong',
  },
  winningScore: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Gametype
