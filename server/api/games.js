const router = require('express').Router()
const { Game, Gametype } = require('../db/models')
module.exports = router

router.get('/gametypes', (req, res, next) => {
  Gametype.findAll()
    .then(gametypes => {
      res.status(201).json(gametypes)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Game.findAll()
    .then(games => {
      res.status(201).json(games)
    })
    .catch(next)
})

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
      if (playersArray.length === game.gametype.maxPlayers) {
        return game.update({ players: playersArray, open: false })
      } else {
        return game.update({ players: playersArray })
      }
    })
    .then(game => res.status(201).json(game))
    .catch(next)
})
