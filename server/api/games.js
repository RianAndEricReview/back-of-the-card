const router = require('express').Router()
const sequelize = require('sequelize')
const { Game, Gametype, GamePlayer, Batting, People, Question } = require('../db/models')
const { QuestionChoices } = require('../../GameplayFunctions/questions/questionGenerator')
const { questionTextGenerator, randomYearSelector } = require('../../GameplayFunctions/questions/questionHelperFuncs')
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
  while (questionChoices.questionSkeletonKey.year === 1972 || questionChoices.questionSkeletonKey.year === 1981 || questionChoices.questionSkeletonKey.year === 1994 || (questionChoices.statCategory === 'adjBA' && questionChoices.questionSkeletonKey.year < 1900)) {
    questionChoices.questionSkeletonKey.year = randomYearSelector(defaultYearRanges)
  }
  //TO REMOVE AFTER LEAST CONTENT IS UPDATED - currently prevents situations where all query results are invalid.
  if (questionChoices.timeFrame === 'allTime') { questionChoices.mostOrLeast = 'most' }

  const questionText = questionTextGenerator(questionChoices)
  const question = { question: questionText, answers: [], correctAnswer: '', gameId: req.params.gameId }

  //Check derived content and set variable if chosen stat category is derived.
  let isDerived = derivedBattingStats.find((stat) => {
    return questionChoices.statCategory === stat.statCat
  })

  let attributes = [[sequelize.fn('SUM', sequelize.col('PA')), 'PA']]
  //set attribute for year based on timeframe
  if (questionChoices.timeFrame === 'singleSeason') {
    attributes.push([sequelize.fn('MIN', sequelize.col('year')), 'year'])
  }
  //set attributes for stat based on whether or not derived. PA is already inclucded when attributes array is created.
  if (!isDerived) {
    attributes.push([sequelize.fn('SUM', sequelize.col(questionChoices.statCategory)), questionChoices.statCategory])
  } else {
    //update name of derived stat
    questionChoices.statCategory = `${questionChoices.statCategory}${questionChoices.timeFrame}`
    isDerived.attributes.forEach((attribute) => {
      attributes.push([sequelize.fn('SUM', sequelize.col(attribute)), attribute])
    })
  }

  //Set the where parameters for the query based on the questionChoices object
  const whereClause = {}
  if (questionChoices.questionSkeletonKey.year) { whereClause.year = questionChoices.questionSkeletonKey.year }
  if (!isDerived) { whereClause[questionChoices.statCategory] = { [sequelize.Op.ne]: null } }

  //To combine stats for players with multiple entries (ex: player was traded, or all time stats):
  // we group by the playerID and sum the needed stats in attributes
  Batting.findAll({
    where: (whereClause !== {}) ? whereClause : null,
    attributes: attributes,
    order: (isDerived) ? null : [[sequelize.col(questionChoices.statCategory), questionChoices.mostOrLeast === 'most' ? 'DESC' : 'ASC']],
    limit: (isDerived || questionChoices.mostOrLeast === 'least') ? null : 100,
    include: [{ model: People, attributes: ['playerID', 'nameFirst', 'nameLast'] }],
    group: ['person.playerID']
  })
    .then(players => {
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

      //Build the question object by selecting the correct answer and 3 other answers, and then post the question to DB.
      if (questionChoices.questionType === 'overall') {
        const answerIndexArr = [Math.ceil(Math.random() * 5), Math.ceil(Math.random() * 10) + 6, Math.ceil(Math.random() * 15) + 16]
        question.correctAnswer = `${playerDataArr[0].person.dataValues.nameFirst} ${playerDataArr[0].person.dataValues.nameLast} ~ ${playerDataArr[0][questionChoices.statCategory]}`
        question.answers.push(`${playerDataArr[0].person.dataValues.nameFirst} ${playerDataArr[0].person.dataValues.nameLast}`)
        answerIndexArr.forEach(answerIndex => {
          question.answers.push(`${playerDataArr[answerIndex].person.dataValues.nameFirst} ${playerDataArr[answerIndex].person.dataValues.nameLast}`)
        })
      } else if (questionChoices.questionType === 'comparison') {
        // randomly choose a player for comparison
        const correctAnswerIndex = Math.floor(Math.random() * 26) + 4
        question.correctAnswer = `${playerDataArr[correctAnswerIndex].person.dataValues.nameFirst} ${playerDataArr[correctAnswerIndex].person.dataValues.nameLast} ~ ${playerDataArr[correctAnswerIndex][questionChoices.statCategory]}`
        question.answers.push(`${playerDataArr[correctAnswerIndex].person.dataValues.nameFirst} ${playerDataArr[correctAnswerIndex].person.dataValues.nameLast}`)

        // create a list of possible other players for comparison
        const possibleIncorrectAnswers = (playerDataArr.length - correctAnswerIndex + 1 > 70) ? playerDataArr.slice(correctAnswerIndex + 1, correctAnswerIndex + 71) : playerDataArr
        const answerIndexParameter = Math.floor(possibleIncorrectAnswers.length / 3)

        // choose other possible answers while making sure the other answer choices do not have the same stat as chosen answer player
        for (let i = 0; i < 3; i++) {
          let incorrectAnswerIndex = Math.floor(Math.random() * answerIndexParameter) + (answerIndexParameter * i)
          while (playerDataArr[correctAnswerIndex][questionChoices.statCategory] === possibleIncorrectAnswers[incorrectAnswerIndex][questionChoices.statCategory]) {
            incorrectAnswerIndex = Math.floor(Math.random() * answerIndexParameter) + (answerIndexParameter * i)
          }
          question.answers.push(`${possibleIncorrectAnswers[incorrectAnswerIndex].person.dataValues.nameFirst} ${possibleIncorrectAnswers[incorrectAnswerIndex].person.dataValues.nameLast}`)
        }
      }
      Question.create(question)
        .then(createdQuestion => res.status(201).json(createdQuestion))
    })
    .catch(next)
})
