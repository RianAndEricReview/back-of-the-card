const router = require('express').Router()
const { Game, Gametype } = require('../db/models')
module.exports = router

// Initially set up for testing gametypes
router.get('/gametypes', (req, res, next) => {
  Gametype.findAll()
    .then(gametypes => {
      res.status(201).json(gametypes)
    })
    .catch(next)
})

// Used to find open game instance for particular game type
router.get('/:gametypeId', (req, res, next) => {
  Game.findOne({
    where: {open: true, gametypeId: req.params.gametypeId}
  })
    .then(game => {
      res.status(201).json(game)
    })
    .catch(next)
})

// Used to create a new game instance
router.post('/', (req, res, next) => {
  Game.create(req.body)
    .then(game => {
      res.status(201).json(game)
    })
    .catch(next)
})

// Used to add a player to a game instance
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
