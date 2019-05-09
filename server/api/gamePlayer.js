const router = require('express').Router()
const { GamePlayer } = require('../db/models')
module.exports = router

router.put('/:gamePlayerId', (req, res, next) => {
  GamePlayer.findByPk(req.params.gamePlayerId)
    .then(gamePlayer => {
      return gamePlayer.update(req.body)
    })
    .then(updatedGamePlayer => {
      res.status(201).json(updatedGamePlayer)
    })
    .catch(next)
})
