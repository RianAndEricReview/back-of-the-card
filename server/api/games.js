const router = require('express').Router()
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
  const gamePromise = Game.findById(req.params.gameId)
  const gamePlayerPromise = GamePlayer.create({gameId: req.params.gameId, userId: req.body.playerId.toString()})
  const findPlayersPromise = GamePlayer.findAll({where: {gameId: req.params.gameId}})
  Promise.map([gamePromise, gamePlayerPromise, findPlayersPromise], result => result)
  .then((game, newPlayer, players) => {
    res.status(200).json(players)
    if (players.length === game.gametype.maxPlayers){
      game.update({ open: false })
      }
  })
  .catch(next)
})
