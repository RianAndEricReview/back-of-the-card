const router = require('express').Router()
const sequelize = require('sequelize')
const { Game, Gametype, GamePlayer, Batting, People, Question} = require('../db/models')
const { QuestionChoices } = require('../../GameplayFunctions/questions/questionGenerator')
const { questionTextGenerator, randomYearSelector } = require('../../GameplayFunctions/questions/questionHelperFuncs')
const { defaultYearRanges, requiredAttributes } = require('../../GameplayFunctions/questions/content/questionContent')
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
  while (questionChoices.questionSkeletonKey.year === 1972 || questionChoices.questionSkeletonKey.year  === 1981 || questionChoices.questionSkeletonKey.year  === 1994 || (questionChoices.statCategory === 'BA' && questionChoices.questionSkeletonKey.year < 1900) ){
    questionChoices.questionSkeletonKey.year  = randomYearSelector(defaultYearRanges)
  }
  console.log('CHOIIIIICCCEEESSS', questionChoices)
  const questionText = questionTextGenerator(questionChoices)
  const question = {question: questionText, answers: [], correctAnswer: '', gameId: req.params.gameId}
  let attributes = []
  const needAttribute = requiredAttributes.reduce((accum, curr) => {
    if (curr[1] === questionChoices.statCategory){
      return false
    } else {
      return accum
    }
  }, true)
  if (needAttribute){
    attributes = requiredAttributes.map(att => att)
    attributes.push([sequelize.fn('SUM', sequelize.col(questionChoices.statCategory)), questionChoices.statCategory])
    console.log('atttttttt', attributes)
  } else {
    attributes = requiredAttributes.map(att => att)
  }

  //THIS QUERY IS NOT CURRENTLY BASED ON THE QUESTIONCHOICES OBJECT, IT IS HARD CODED FOR HRS IN 2008
  //Eventually it will dynamically query based on the questionChoices object.
  //To combine stats for players with multiple entries (ex: player was traded, or all time stats):
  // we group by the playerID and sum the needed stats in attributes

  Batting.findAll({
    where: (questionChoices.questionSkeletonKey.year) ? {year: questionChoices.questionSkeletonKey.year} : null,
    attributes: attributes,
    include: [{model: People, attributes: [ 'playerID', 'nameFirst', 'nameLast' ]}],
    group: [ 'person.playerID' ]
  })
  .then(players => {
    const playerDataArr = (questionChoices.timeFrame === 'allTime') ? players.map(player => player.dataValues).filter(player => (player.PA >= 3000))
    : players.map(player => player.dataValues)
    console.log('a player!!!!!!', playerDataArr[0])
    //sort the returned player data array either desc or asc based on most or least
    questionChoices.mostOrLeast === 'most' ? playerDataArr.sort((a, b) => {return b[questionChoices.statCategory] - a[questionChoices.statCategory]}) : playerDataArr.sort((a, b) => a[questionChoices.statCategory] - b[questionChoices.statCategory])
    //Build the question object by selecting the correct answer and 3 other answers, and then post the question to DB.
    const answerIndexArr = [Math.ceil(Math.random() * 5), Math.ceil(Math.random() * 10) + 6, Math.ceil(Math.random() * 15) + 16]
    question.correctAnswer = `${playerDataArr[0].person.dataValues.nameFirst} ${playerDataArr[0].person.dataValues.nameLast} ~ ${playerDataArr[0][questionChoices.statCategory]}`
    question.answers.push(`${playerDataArr[0].person.dataValues.nameFirst} ${playerDataArr[0].person.dataValues.nameLast}`)
    answerIndexArr.forEach(answerIndex => {
      question.answers.push(`${playerDataArr[answerIndex].person.dataValues.nameFirst} ${playerDataArr[answerIndex].person.dataValues.nameLast}`)
    })
    Question.create(question)
    .then(createdQuestion => res.status(201).json(createdQuestion))
  })
  .catch(next)
})
