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

router.put('/:gameId/addNewPlayer', (req, res, next) => {
  Game.findById(req.params.gameId)
    .then(game => {
      const playersArray = [...game.players, req.body.id]
      if (playersArray.length === game.maxPlayers) {
        return game.update({players: playersArray, open: false})
      } else {
        return game.update({players: playersArray})
      }
    })
    .then(game => res.status(201).json(game))
    .catch(next)
})
