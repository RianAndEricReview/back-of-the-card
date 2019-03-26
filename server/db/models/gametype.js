const Sequelize = require('sequelize')
const db = require('../db')

const Gametype = db.define('gametype', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  abbreviation: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://media.istockphoto.com/photos/baseball-player-picture-id502862639?k=6&m=502862639&s=612x612&w=0&h=VN9GeJiJYZcJFoboDg5trQk8_0EwTgTQGq6ij_2xv5I=',
  },
  description: {
    type: Sequelize.TEXT,
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
