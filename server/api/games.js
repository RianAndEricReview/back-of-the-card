const router = require('express').Router()
const sequelize = require('sequelize')
const { Game, Gametype, GamePlayer, Batting, People, Question, User } = require('../db/models')
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
  //compilies sorted results with player stats aggregated
  // Batting.aggregate('HR', 'SUM', { where: {year: 2008}, plain: false, group: [ 'person.playerID' ], include: [{model: People, attributes: [ 'nameFirst', 'nameLast']}], attributes: [] })
  // Batting.findAll({
  //   group: [ 'person.playerID' ],
  //   attributes: [
  //     sequelize.fn('SUM', sequelize.col('field2'))
  //     // etc
  //   ],
  //   where: {
  //     validTo: null
  //   }
  // })
  Batting.findAll({
    where: {year: 2008},
    attributes: [[sequelize.fn('SUM', sequelize.col('HR')), 'HR'], [sequelize.fn('SUM', sequelize.col('AB')), 'AB']],
    include: [{model: People, attributes: [ 'playerID', 'nameFirst', 'nameLast']}],
    group: [ 'person.playerID' ]
  })
  .then(players => {
    const playerDataArr = players.map(player => {
      return player.dataValues
    })
    // console.log(noDataValues)
    playerDataArr.sort((a, b) => {return a.HR - b.HR})
    // console.log(players[0])
    playerDataArr.forEach((player, index) => {
      console.log(index, player.HR, player.AB, player.person.dataValues.nameFirst, player.person.dataValues.nameLast, player.person.dataValues.playerID )
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
