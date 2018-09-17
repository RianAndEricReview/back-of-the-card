const router = require('express').Router()
const sequelize = require('sequelize')
const { Game, Gametype, GamePlayer, Batting, People, Question, Teams } = require('../db/models')
const { QuestionChoices, QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { randomYearSelector } = require('../../GameplayFunctions/questions/questionHelperFuncs')
const { defaultYearRanges, derivedBattingStats, minPAPerYear } = require('../../GameplayFunctions/questions/content/questionContent')
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
  //generate and populate questionChoices, questionText, question object skeleton
  const questionChoices = new QuestionChoices()
  questionChoices.questionChoiceGenerator(teamOrPlayer, defaultYearRanges)
  //eliminate strike years, BA before 1900
  while (questionChoices.questionSkeletonKey.year === 1972 || questionChoices.questionSkeletonKey.year === 1981 || questionChoices.questionSkeletonKey.year === 1994 || (questionChoices.statCategory === 'adjBA' && questionChoices.questionSkeletonKey.year < 1900) || (questionChoices.teamOrPlayer === 'team' && questionChoices.questionSkeletonKey.year < 1900)) {
    questionChoices.questionSkeletonKey.year = randomYearSelector(defaultYearRanges)
  }
  //TO REMOVE AFTER LEAST CONTENT IS UPDATED - currently prevents situations where all query results are invalid.
  if (questionChoices.timeFrame === 'allTime') { questionChoices.mostOrLeast = 'most' }

  const question = new QuestionObjectGenerator(req.params.gameId)
  question.questionTextGenerator(questionChoices)


  //Check derived content and set variable if chosen stat category is derived.
  let isDerived = derivedBattingStats.find((stat) => {
    return questionChoices.statCategory === stat.statCat
  })

  console.log('QC--------', questionChoices)
  //Creating and populating the object that will be passed into the query
  const QQP = new QuestionQueryParameters()
  Object.getOwnPropertyNames(QQP.constructor.prototype).forEach( method => {
    if(method !== 'constructor') {
      QQP[method](questionChoices, isDerived)
    }
  })
  console.log('OPP!!!!!!!!!!!!', QQP)

  //select query based on whether it is a team or player question
  if (questionChoices.teamOrPlayer === 'wholeTeam') {
    Teams.findAll({...QQP})
    .then(teams => {
      console.log('teams', teams[0])
        let teamDataArr = teams.map(team => {
          return team.dataValues
        })

        // Generate questionObject answers, and then post the question to DB.
        question.questionAnswerGenerator(questionChoices, teamDataArr)

        Question.create(question)
          .then(createdQuestion => res.status(201).json(createdQuestion))
      })
      .catch(next)
  } else {
    //To combine stats for players with multiple entries (ex: player was traded, or all time stats):
    // we group by the playerID and sum the needed stats in attributes
    Batting.findAll({...QQP})
      .then(players => {
        console.log('player', players[0])
        let playerDataArr = []
        //Creates the result array of player objects, in the proper order, to be used to select answers.
        switch (true) {
          case (questionChoices.timeFrame === 'allTime' && !!isDerived):
            playerDataArr = players.map(player => {
              return { ...player.dataValues, [questionChoices.statCategory]: player[questionChoices.statCategory] }
            }).filter(player => (player.PA >= 3000)).sort((a, b) => { return b[questionChoices.statCategory] - a[questionChoices.statCategory] })
            break
          case (questionChoices.timeFrame === 'singleSeason' && !!isDerived):
            playerDataArr = (questionChoices.mostOrLeast === 'most') ?
              players.map(player => {
                return { ...player.dataValues, [questionChoices.statCategory]: player[questionChoices.statCategory] }
              }).sort((a, b) => { return b[questionChoices.statCategory] - a[questionChoices.statCategory] })
              : players.map(player => {
                return { ...player.dataValues, [questionChoices.statCategory]: player[questionChoices.statCategory] }
              }).sort((a, b) => { return a[questionChoices.statCategory] - b[questionChoices.statCategory] })
            break
          case (questionChoices.timeFrame === 'singleSeason' && questionChoices.mostOrLeast === 'least'):
            let minPA = 502
            // Used to set the required minimum plate appearances based on the year
            for (let i = 0; i < minPAPerYear.length; i++) {
              if (questionChoices.questionSkeletonKey.year >= minPAPerYear[i].start && questionChoices.questionSkeletonKey.year <= minPAPerYear[i].end) {
                minPA = minPAPerYear[i].minPA
                break
              }
            }
            playerDataArr = players.map(player => {
              return player.dataValues
            }).filter(player => (player.PA >= minPA))
            break
          default:
            playerDataArr = players.map(player => {
              return player.dataValues
            })
        }

        // Generate questionObject answers, and then post the question to DB.
        question.questionAnswerGenerator(questionChoices, playerDataArr)

        Question.create(question)
          .then(createdQuestion => res.status(201).json(createdQuestion))
      })
      .catch(next)
  }
})
