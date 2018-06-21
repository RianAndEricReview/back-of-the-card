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
    },
  })

module.exports = User

//Instance methods
User.prototype.correctPassword = function (attemptedPassword) {
  return User.encryptPassword(attemptedPassword, this.salt()) === this.password()
}

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt'])
}

//Class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

//class method to be used when signing  a new user
User.signUpUser = function (reqBody, req, res, next) {
  this.create(reqBody)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user.sanitize())))
    })
    .catch(err => {
      //checks to see if error is unique email validation error, if so sends message to client
      if (err.name === 'SequelizeUniqueConstraintError' && err.fields.email) {
        console.log('User already exists: ', reqBody.email)
        res.status(401).send('User already exists.')
      }
      //checks to see if error is unique screenName validation error, if so it calls signUpUser recusively and creates a new screenName with a random number on end which it passes in as the new reqBody value.
      else if (err.name === 'SequelizeUniqueConstraintError' && err.fields.screenName) {
        this.signUpUser({...reqBody, screenName: `${reqBody.firstName}${reqBody.lastName}${Math.floor(Math.random() * 100000)}`}, req, res, next)
      } else {
        next(err)
      }
    })
}

// Hooks
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}
const setDefaultScreenName = instance => {
  if (!instance.screenName){
    instance.screenName = `${instance.firstName}${instance.lastName}`
  }
}

User.beforeValidate(setDefaultScreenName)
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
