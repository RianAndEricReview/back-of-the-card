const router = require('express').Router()
const { Game } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Game.create(req.body)
    .then(game => {
      res.status(201).json(game)
    })
    .catch(next)
})

