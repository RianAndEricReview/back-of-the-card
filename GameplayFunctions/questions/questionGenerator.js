const randomYearSelector = require('./questionHelperFuncs').randomYearSelector
const randomValueSelector = require('./questionHelperFuncs').randomValueSelector
const questionSkeletons = require('./content/questionContent').questionSkeletons

//THIS FILE CONTAINS ALL QUESTION GENERATING CONSTRUCTOR FUNCTIONS

//class to create an object with a list of question pieces
class QuestionChoices {
  constructor() {
    this.questionSkeletonKey = {}
  }

  questionChoiceGenerator(optionsArray, yearRange) {
    const questionChoiceSelector = function(passedInOptions, choicesObject) {
      const chosenOption = randomValueSelector(passedInOptions)
      chosenOption.whatToSet.forEach((curr) => {
        //set questionChoice properties
        choicesObject[curr.key] = curr.value
        //set questionSkeleton name on questionChoices object
        if (curr.questionSkeletonName) {
          choicesObject.questionSkeletonName = curr.questionSkeletonName
        }
        //set questionSkeletonKey object on questionChoices object
        if (curr.skeletonType) {
          for (let type in curr.skeletonType) {
            if (curr.skeletonType.hasOwnProperty(type)) {
              for (let piece in curr.skeletonType[type]) {
                if (curr.skeletonType[type].hasOwnProperty(piece)) {
                  choicesObject.questionSkeletonKey[piece] = curr.skeletonType[type][piece]
                }
              }
            }
          }
        }
      })
      //recursively run generator on next array of choices, if there is one
      if (chosenOption.nextChoice) {
        questionChoiceSelector(chosenOption.nextChoice, choicesObject)
      }
    }

    questionChoiceSelector(optionsArray, this)

    //set the year, if it needs one
    if (this.timeFrame === 'singleSeason') {
      this.questionSkeletonKey.year = randomYearSelector(yearRange)
    }
  }
}

// class to generate question objects
class QuestionObjectGenerator {
  constructor(gameId) {
    this.question = ''
    this.answers = []
    this.correctAnswer = ''
    this.gameId = gameId
  }

  questionTextGenerator(questionChoices) {
    if (questionChoices.timeFrame === 'allTime') {
      questionChoices.questionSkeletonKey.verb = questionChoices.questionSkeletonKey.verb.map(textOption => {
        return (textOption === 'had') ? 'has' : textOption
      })
    }
    //the skeleton name is currently hard coded to be 'statQuestionSkeleton'
    //later when we have updated the content in the options objects this should set from the questionSkeletonName off questionChoices
    //questionSkeletons[this.questionChoices.questionSkeletonName](this.questionChoices.questionSkeletonKey)
    this.question = questionSkeletons.statQuestionSkeleton(questionChoices.questionSkeletonKey)
  }

  questionAnswerGenerator(questionChoices, queryResults) {
    const teamName = (questionChoices.timeFrame === 'singleSeason') ? 'name' : franchise.dataValues.name
    if (questionChoices.teamOrPlayer === 'wholeTeam') {
      if (questionChoices.questionType === 'overall') {
        //add correct answer to question object
        this.correctAnswer = `${queryResults[0][teamName]} ~ ${queryResults[0][questionChoices.statCategory]}`
        this.answers.push(`${queryResults[0][teamName]}`)
        //add incorrect answers to question object
        let teamIncorrectAnswerIndex = 1
        while (queryResults[teamIncorrectAnswerIndex][questionChoices.statCategory] === queryResults[0][questionChoices.statCategory]) {
          teamIncorrectAnswerIndex++
        }
        this.answers.push(`${queryResults[teamIncorrectAnswerIndex][teamName]}`)
        this.answers.push(`${queryResults[Math.floor(Math.random() * (queryResults.length - teamIncorrectAnswerIndex - 1)) + teamIncorrectAnswerIndex + 1][teamName]}`)
        this.answers.push(`${queryResults[Math.floor(Math.random() * (queryResults.length - teamIncorrectAnswerIndex - 1)) + teamIncorrectAnswerIndex + 1][teamName]}`)
        while (this.answers[2] === this.answers[3]) {
          this.answers[3] = `${queryResults[Math.floor(Math.random() * (queryResults.length - teamIncorrectAnswerIndex - 1)) + teamIncorrectAnswerIndex + 1][teamName]}`
        }
      } else if (questionChoices.questionType === 'comparison') {
        // randomly select team from top half of list for comparison
        const teamAnswerIndex = Math.floor(Math.random() * Math.floor(queryResults.length / 2)) + 1
        this.correctAnswer = `${queryResults[teamAnswerIndex][teamName]} ~ ${queryResults[teamAnswerIndex][questionChoices.statCategory]}`
        this.answers.push(`${queryResults[teamAnswerIndex][teamName]}`)

        // choose other possible answers while making sure the other answer choices do not have same stat value as the chosen/correct answer
        const possibleTeamIncorrectAnswers = queryResults.slice(teamAnswerIndex + 1)
        for (let i = 0; i < 3; i++) {
          let teamIncorrectAnswerIndex = Math.floor(Math.random() * possibleTeamIncorrectAnswers.length)
          while (possibleTeamIncorrectAnswers[teamIncorrectAnswerIndex][questionChoices.statCategory] === queryResults[teamAnswerIndex][questionChoices.statCategory]) {
            teamIncorrectAnswerIndex = Math.floor(Math.random() * possibleTeamIncorrectAnswers.length)
          }
          this.answers.push(`${possibleTeamIncorrectAnswers[teamIncorrectAnswerIndex][teamName]}`)
        }
      }
    } else if (questionChoices.teamOrPlayer === 'singlePlayer') {
      if (questionChoices.questionType === 'overall') {
        const answerIndexArr = [Math.ceil(Math.random() * 5), Math.ceil(Math.random() * 10) + 6, Math.ceil(Math.random() * 15) + 16]
        this.correctAnswer = `${queryResults[0].person.dataValues.nameFirst} ${queryResults[0].person.dataValues.nameLast} ~ ${queryResults[0][questionChoices.statCategory]}`
        this.answers.push(`${queryResults[0].person.dataValues.nameFirst} ${queryResults[0].person.dataValues.nameLast}`)
        answerIndexArr.forEach(answerIndex => {
          this.answers.push(`${queryResults[answerIndex].person.dataValues.nameFirst} ${queryResults[answerIndex].person.dataValues.nameLast}`)
        })
      } else if (questionChoices.questionType === 'comparison') {
        // randomly choose a player for comparison
        const correctAnswerIndex = Math.floor(Math.random() * 26) + 4
        this.correctAnswer = `${queryResults[correctAnswerIndex].person.dataValues.nameFirst} ${queryResults[correctAnswerIndex].person.dataValues.nameLast} ~ ${queryResults[correctAnswerIndex][questionChoices.statCategory]}`
        this.answers.push(`${queryResults[correctAnswerIndex].person.dataValues.nameFirst} ${queryResults[correctAnswerIndex].person.dataValues.nameLast}`)

        // create a list of possible other players for comparison
        const possibleIncorrectAnswers = (queryResults.length - correctAnswerIndex + 1 > 70) ? queryResults.slice(correctAnswerIndex + 1, correctAnswerIndex + 71) : queryResults
        const answerIndexParameter = Math.floor(possibleIncorrectAnswers.length / 3)

        // choose other possible answers while making sure the other answer choices do not have the same stat as chosen answer player
        for (let i = 0; i < 3; i++) {
          let incorrectAnswerIndex = Math.floor(Math.random() * answerIndexParameter) + (answerIndexParameter * i)
          while (queryResults[correctAnswerIndex][questionChoices.statCategory] === possibleIncorrectAnswers[incorrectAnswerIndex][questionChoices.statCategory]) {
            incorrectAnswerIndex = Math.floor(Math.random() * answerIndexParameter) + (answerIndexParameter * i)
          }
          this.answers.push(`${possibleIncorrectAnswers[incorrectAnswerIndex].person.dataValues.nameFirst} ${possibleIncorrectAnswers[incorrectAnswerIndex].person.dataValues.nameLast}`)
        }
      }
    }
  }
}

module.exports = { QuestionChoices, QuestionObjectGenerator }
