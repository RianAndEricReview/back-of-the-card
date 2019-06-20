/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable no-loop-func */
const router = require('express').Router()
const { Game, Gametype, GamePlayer, Batting, Question, Teams } = require('../db/models')
const { QuestionChoices, QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { questionCreatorFunc } = require('../../GameplayFunctions/questions/questionCreatorFunc')
const { defaultYearRanges, derivedBattingStats } = require('../../GameplayFunctions/questions/content/questionContent')
const firstOption = require('../../GameplayFunctions/questions/content/questionOptionsContent').questionType
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
      (game) ? res.status(200).json({ id: game.dataValues.id }) : res.status(204).json(game)
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

// Used to create a new set of questions for a game
router.post('/:gameId/createQuestions', (req, res, next) => {
  const gametype = req.body.gametype
  const gameId = req.body.gameId
  const numOfQuestions = gametype.numOfQuestions
  const questionTexts = []
  const findAllInfoArr = []

  //create the proper number of questions for a game based on the # of questions stated in the req.
  for (let i = 1; i <= numOfQuestions; i++) {
    //generate and populate questionChoices, questionText, question object
    let questionChoices = {}
    let question
    //check to make sure we don't include a question twice in the same game.
    while (!question || questionTexts.includes(question.question)) {
      questionChoices = new QuestionChoices()
      questionChoices.questionChoiceGenerator(firstOption, defaultYearRanges)
      question = new QuestionObjectGenerator(gameId, i)
      question.questionTextGenerator(questionChoices)
    }
    questionTexts.push(question.question)

    //Check derived content and set variable if chosen stat category is derived.
    let isDerived = derivedBattingStats.find((stat) => {
      return questionChoices.statCategory === stat.statCat
    })

    //Create and populate the object that will be passed into the query
    const QQP = new QuestionQueryParameters()
    Object.getOwnPropertyNames(QQP.constructor.prototype).forEach(method => {
      if (method !== 'constructor') {
        QQP[method](questionChoices, isDerived)
      }
    })

    //select table to query based on whether it is a team or player question
    //as we update the logic to add additional types like pitching or individual team, this might be better off as a switch statement.
    let table = ''
    if (questionChoices.teamOrPlayer === 'wholeTeam') { table = Teams }
    else if (questionChoices.teamOrPlayer === 'singlePlayer') { table = Batting }

    // Info needed to build a question object
    const findAllInfo = { QQP, questionChoices, isDerived, table, question }
    findAllInfoArr.push(findAllInfo)
  }

  questionCreatorFunc(findAllInfoArr, req.app.io, gameId)
  res.end()
})

// Used to create a new game instance with gametype
router.post('/', (req, res, next) => {
  Gametype.findByPk(req.body.gametypeId)
    .then(gametype => {
      return Game.create({ open: req.body.open, gametypeId: gametype.id })
        .then(game => {
          game.dataValues.gametype = gametype
          res.status(201).json(game)
          //join the room and then run the question creator func
          req.app.io.to(`${req.body.socketId}`).emit('hostJoinRoom', game.id)
          //create the user's gamePlayer in DB
          return GamePlayer.create({ gameId: game.id, userId: req.body.playerId.toString() })
        })
    })
    .catch(next)
})

// Used to add a player to a game instance
router.put('/:gameId/addNewPlayer', (req, res, next) => {
  //Create the GamePlayer instance linking user to game.
  GamePlayer.create({ gameId: req.params.gameId, userId: req.body.playerId.toString() })
    .then((newPlayer) => {
      //let everyone in the GameRoom know there is a new gamePlayer
      req.app.io.in(`GameRoom${req.params.gameId}`).emit('newPlayerToGame', newPlayer)
      //Get info to decide whether to close game or not.
      return Promise.all([Game.findByPk(req.params.gameId), GamePlayer.findAll({ where: { gameId: req.params.gameId } })])
        .then((result) => {
          const [game, players] = result
          if (players.length >= game.gametype.maxPlayers) {
            game.update({ open: false })
          }
          delete game.dataValues.gamePlayers
          res.status(200).json(game)
        })
    })
    .catch(next)
})

// Used to fetch all questions of a specific game instanace
router.get('/:gameId/questions', (req, res, next) => {
  Question.findAll({
    where: { gameId: req.params.gameId }
  })
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(next)
})

// Used to update data in a specific game instance
router.put('/:gameId', (req, res, next) => {
  Game.findByPk(req.params.gameId)
    .then(game => {
      return game.update(req.body)
    })
    .then(updatedGame => {
      res.status(201).json(updatedGame)
    })
    .catch(next)
})
