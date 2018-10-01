const router = require('express').Router()
const sequelize = require('sequelize')
const { Game, Gametype, GamePlayer, Batting, Question, Teams } = require('../db/models')
const { QuestionChoices, QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { randomYearSelector, dataConsolidator } = require('../../GameplayFunctions/questions/questionHelperFuncs')
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

// Used to create a new game instance with gametype
router.post('/', (req, res, next) => {
  Gametype.findById(req.body.gametypeId)
  .then(gametype => {
    return Game.create({ open: req.body.open, gametypeId: gametype.id })
    .then(game => {
      game.dataValues.gametype = gametype
      res.status(201).json(game)
      return GamePlayer.create({ gameId: game.id, userId: req.body.playerId.toString() })
    })
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
  const numOfQuestions = req.body.numOfQuestions
  const questionTexts = []
  const questionInfoArr = []

  //create the proper number of questions for a game based on the # of questions stated in the req.
  for (let i = 1; i <= numOfQuestions; i++) {
    //generate and populate questionChoices, questionText, question object
    let questionChoices = {}
    let question
    //check to make sure we don't include a question twice in the same game.
    while (!question || questionTexts.includes(question.question)) {
      questionChoices = new QuestionChoices()
      questionChoices.questionChoiceGenerator(firstOption, defaultYearRanges)

      //TO REMOVE AFTER LEAST CONTENT IS UPDATED - currently prevents situations where all query results are invalid.
      if (questionChoices.timeFrame === 'allTime') {
        questionChoices.mostOrLeast = 'most'
        questionChoices.questionSkeletonKey.mostOrLeast = ['most']
      }

      question = new QuestionObjectGenerator(req.params.gameId, i)
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
    questionInfoArr.push(findAllInfo)
  }

  // Set up as nested Promise.alls to collect all questions before sending them to the front end
  Promise.all(questionInfoArr.map(findInfo => findInfo.table.findAll({ ...findInfo.QQP })))
    .then(foundInfo => {
      const questionsArr = []
      foundInfo.forEach((data, idx) => {
        let consolidatedDataArr = dataConsolidator(data, questionInfoArr[idx].questionChoices, questionInfoArr[idx].isDerived)
        // Generate questionObject answers
        questionInfoArr[idx].question.questionAnswerGenerator(questionInfoArr[idx].questionChoices, consolidatedDataArr)
        questionsArr.push(questionInfoArr[idx].question)
      })
      // Post the questions to DB and send results to front end
      Promise.all(questionsArr.map(question => Question.create(question)
      ))
        .then(questions => {
          res.status(201).json(questions)
        })
    })
    .catch(next)
})
