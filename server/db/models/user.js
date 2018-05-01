const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const User = db.define('user', {
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
    user.salt = user.generateSalt()
    user.password = user.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
