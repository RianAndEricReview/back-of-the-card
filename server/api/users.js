const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.status(201).json(user))
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('Screen name already taken, please try another')
      } else {
        next(err)
      }
    })
})

router.get('/:userId', (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => res.status(200).json(user))
    .catch(next)
})
