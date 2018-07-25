const router = require('express').Router()
const Bluebird = require('bluebird')
const { Game, Gametype, GamePlayer } = require('../db/models')
module.exports = router

// Used to find all currently enabled gametypes
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
    where: { open: true, gametypeId: req.params.gametypeId }
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
// router.put('/:gameId/addNewPlayer', (req, res, next) => {
//   const gamePromise = Game.findById(req.params.gameId)
//   const findPlayersPromise = GamePlayer.findAll({ where: { gameId: req.params.gameId } })
//   GamePlayer.create({ gameId: req.params.gameId, userId: req.body.playerId.toString() })
//     .then(() => {
//       GamePlayer.findAll({ where: { gameId: req.params.gameId } })
//         .then((result) => {
//           res.status(200).json(result)
//         })
//     })
//     .catch(next)
// })

router.put('/:gameId/addNewPlayer', (req, res, next) => {
  GamePlayer.create({ gameId: req.params.gameId, userId: req.body.playerId.toString() })
    .then(() => {
      return Promise.all([Game.findById(req.params.gameId), GamePlayer.findAll({ where: { gameId: req.params.gameId } })])
        .then((result) => {
          const [game, players] = result
          if (players.length === game.gametype.maxPlayers) {
            game.update({ open: false })
          }
          res.status(200).json(players)
        })
    })
    .catch(next)
})
