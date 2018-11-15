const router = require('express').Router()
const { GamePlayer } = require('../db/models')
module.exports = router

router.put('/', (req, res, next) => {
  GamePlayer.findById(req.body.id)
  .then(gamePlayer => {
    return gamePlayer.update(req.body)
  })
  .then(updatedGamePlayer => {
    res.status(201).json(updatedGamePlayer)
  })
  .catch(next)
})
