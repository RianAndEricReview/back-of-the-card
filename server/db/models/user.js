const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')
const _ = require('lodash')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  screenName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  playerImage: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://i.pinimg.com/originals/50/45/bc/5045bcee09efb8b9f3281eb3c70e7914.jpg',
  },
  totalScores: {
    type: Sequelize.TEXT,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    totalScoresObject() {
      return JSON.parse(this.totalScores)
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  },
  setterMethods: {
    totalScores(value) {
      this.setDataValue('totalScores', JSON.stringify(value))
    }
  }
})

module.exports = User

//Instance methods
User.prototype.correctPassword = function(attemptedPassword) {
  return User.encryptPassword(attemptedPassword, this.salt()) === this.password()
}

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt'])
}

//Class methods
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

// Hooks
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
