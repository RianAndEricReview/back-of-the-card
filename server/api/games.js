/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable no-loop-func */
const router = require('express').Router()
const sequelize = require('sequelize')
const socket = require('../socket')
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

// Used to create a new game instance with gametype
router.post('/', (req, res, next) => {
  Gametype.findById(req.body.gametypeId)
    .then(gametype => {
      return Game.create({ open: req.body.open, gametypeId: gametype.id })
        .then(game => {
          game.dataValues.gametype = gametype
          game.numQuestionsCreated = 0
          res.status(201).json(game)

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
              //TO REMOVE AFTER LEAST CONTENT IS UPDATED - currently prevents situations where all query results are invalid.
              if (questionChoices.timeFrame === 'allTime') {
                questionChoices.mostOrLeast = 'most'
                questionChoices.questionSkeletonKey.mostOrLeast = ['most']
              }

              question = new QuestionObjectGenerator(game.id, i)
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

          const questionCreatorFunc = (questionInfoArr) => {
            const questionsArr = []
            const newQuestionInfoArr = []
            Promise.all(questionInfoArr.map(findInfo => findInfo.table.findAll({ ...findInfo.QQP })))
              .then(foundInfo => {
                foundInfo.forEach((data, idx) => {
                  let dataIsGood = true
                  let consolidatedDataArr
                  if (!data.length) {
                    dataIsGood = false
                  } else {
                    //run the data consolidator
                    consolidatedDataArr = dataConsolidator(data, questionInfoArr[idx].questionChoices, questionInfoArr[idx].isDerived)

                    // for MOST questions check to make sure data is valid
                    if (questionInfoArr[idx].questionChoices.mostOrLeast === 'most') {
                      // make sure there are enough data points after the sixth to make a good question
                      const failsafePlayer = consolidatedDataArr[5]
                      const firstValidPlayerIdx = consolidatedDataArr.findIndex(player => failsafePlayer[questionInfoArr[idx].questionChoices.statCategory] !== player[questionInfoArr[idx].questionChoices.statCategory])
                      if (consolidatedDataArr.slice(firstValidPlayerIdx).length < 30) {
                        dataIsGood = false
                      }

                      //check first 10 fail if any are nulls or 0s
                      for (let j = 0; j < 10; j++) {
                        if (consolidatedDataArr[j][questionInfoArr[idx].questionChoices.statCategory] === '0') {
                          dataIsGood = false
                          break
                        }
                      }

                      //if overall, fail if the first 6 values are the same
                      if (dataIsGood && consolidatedDataArr.length < 30 && questionInfoArr[idx].questionChoices.questionType === 'overall' && (consolidatedDataArr[0][questionInfoArr[idx].questionChoices.statCategory] === consolidatedDataArr[5][questionInfoArr[idx].questionChoices.statCategory])) {
                        dataIsGood = false
                      }
                    }

                    // for LEAST questions check to make sure data is valid
                    else if (questionInfoArr[idx].questionChoices.mostOrLeast === 'least') {
                      const failsafePlayer = consolidatedDataArr[0]
                      const firstValidPlayerIdx = consolidatedDataArr.findIndex(player => failsafePlayer[questionInfoArr[idx].questionChoices.statCategory] !== player[questionInfoArr[idx].questionChoices.statCategory])
                      if (consolidatedDataArr.slice(firstValidPlayerIdx).length < 30) {
                        dataIsGood = false
                      }
                    }
                  }

                  if (dataIsGood) {
                    // Generate questionObject answers
                    questionInfoArr[idx].question.questionAnswerGenerator(questionInfoArr[idx].questionChoices, consolidatedDataArr)
                    questionsArr.push(questionInfoArr[idx].question)

                    //if answers comes back as empty array pick a new year for the query
                    if (questionInfoArr[idx].question.answers === []) {
                      const newRandomYear = randomYearSelector(defaultYearRanges)
                      questionInfoArr[idx].questionChoices.questionSkeletonKey.year = newRandomYear
                      questionInfoArr[idx].QQP.where.year = newRandomYear
                      dataIsGood = false
                    }
                  }

                  //if data is not good get another random year
                  if (!dataIsGood) {
                    //*******TODO update the database with the year and stat of bad data

                    //use the idx to get the correct findAllInfo object from the questionInfoArr
                    //Update the year in all spots in the (question choices/skeleton key and the QQP)
                    const newRandomYear = randomYearSelector(defaultYearRanges)
                    questionInfoArr[idx].questionChoices.questionSkeletonKey.year = newRandomYear
                    questionInfoArr[idx].QQP.where.year = newRandomYear
                    newQuestionInfoArr.push(questionInfoArr[idx])
                  }
                })

                if (questionsArr.length > 0) {
                  // Post the questions to DB and send results to front end
                  return Promise.all(questionsArr.map(question => Question.create(question)))
                    .then(() => {
                      const questionCount = questionsArr.length
                      socket.emit('questionsAdded', game.id, questionCount)
                    })
                    .catch(next)
                }

                if (newQuestionInfoArr.length > 0) {
                  questionCreatorFunc(newQuestionInfoArr)
                }

              })
              .catch(next)
          }
          questionCreatorFunc(findAllInfoArr)
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
  Game.findById(req.params.gameId)
    .then(game => {
      return game.update(req.body)
    })
    .then(updatedGame => {
      res.status(201).json(updatedGame)
    })
    .catch(next)
})

