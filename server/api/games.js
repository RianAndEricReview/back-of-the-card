const router = require('express').Router()
const Sequelize = require('sequelize')
const { Game, Gametype, GamePlayer, Batting, Question, User } = require('../db/models')
const { QuestionChoices } = require('../../GameplayFunctions/questions/questionGenerator')
const { questionTextGenerator } = require('../../GameplayFunctions/questions/questionHelperFuncs')
const { defaultYearRanges } = require('../../GameplayFunctions/questions/content/questionContent')
const { teamOrPlayer } = require('../../GameplayFunctions/questions/content/questionOptionsContent')
module.exports = router

// Used to find all currently enabled gametypes
router.get('/gametypes', (req, res, next) => {
  Gametype.findAll()
    .then(gametypes => {
      res.status(200).json(gametypes)
    })
    .catch(next)
})

// Used to find open game instance for particular game type
router.get('/:gametypeId', (req, res, next) => {
  Game.findOne({
    where: { open: true, gametypeId: req.params.gametypeId }
  })
    .then(game => {
      res.status(200).json(game)
    })
    .catch(next)
})

// Used to fetch all players in a specific game instanace
router.get('/:gameId/players', (req, res, next) => {
  GamePlayer.findAll({
    where: { gameId: req.params.gameId }
  })
    .then(players => {
      res.status(200).json(players)
    })
    .catch(next)
})

// Used to create a new game instance
router.post('/', (req, res, next) => {
  Game.create({ open: req.body.open, gametypeId: req.body.gametypeId })
    .then(game => {
      res.status(201).json(game)
      return GamePlayer.create({ gameId: game.id, userId: req.body.playerId.toString() })
    })
    .catch(next)
})

// Used to add a player to a game instance
router.put('/:gameId/addNewPlayer', (req, res, next) => {
  //Create the GamePlayer instance linking user to game.
  GamePlayer.create({ gameId: req.params.gameId, userId: req.body.playerId.toString() })
    .then(() => {
      //Get info to decide whether to close game or not.
      return Promise.all([Game.findById(req.params.gameId), GamePlayer.findAll({ where: { gameId: req.params.gameId } })])
        .then((result) => {
          const [game, players] = result
          if (players.length === game.gametype.maxPlayers) {
            game.update({ open: false })
          }
          res.status(200).json(game)
        })
    })
    .catch(next)
})

// Used to generate a question instance
router.post('/:gameId/question', (req, res, next) => {
  const questionChoices = new QuestionChoices()
  questionChoices.questionChoiceGenerator(teamOrPlayer, defaultYearRanges)
  const questionText = questionTextGenerator(questionChoices)
  // Batting.findAll({order: [['HR', 'DESC']], limit: 10, where: {year: 2008}, attributes: ['HR', 'playerID']})
  Batting.aggregate('playerID', 'DISTINCT', {where: {year: 2008}, plain: false, limit: 200})
  .then(players => {
    let playerTotals = players.map(player => {
      return Batting.findAll({where: {playerID: player.DISTINCT, year: 2008}, attributes: ['HR', 'playerID']})
    })
    Promise.all(playerTotals)
    .then(playerEntries => {
      const homerTotals = playerEntries.map(entry => {
        return {playerID: entry[0].dataValues.playerID, HR: entry.reduce((accum, curr) => {
          return (curr.dataValues.HR) ? accum + curr.dataValues.HR : accum
        }, 0)}
      })
      homerTotals.sort((a, b) => {return b.HR - a.HR})
      console.log('!!!!!!!!!!!', homerTotals)
    })
  })
})


// questionSkeletonKey:
//   mostOrLeast:["most"]
//   objectNoun:["home runs"]
//   subjectNoun:["player"]
//   timeFrame:[" in "]
//   verb:["hit"]
//   year:2008

// questionType:"overall"
// statCategory:"HOME RUNS"
// teamOrPlayer:"singlePlayer"
// timeFrame:"singleSeason"
// mostOrLeast:"most"
