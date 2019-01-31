/* eslint-disable max-statements */
/* eslint-disable complexity */
const randomYearSelector = require('./questionHelperFuncs').randomYearSelector
const randomValueSelector = require('./questionHelperFuncs').randomValueSelector
const questionSkeletons = require('./content/questionContent').questionSkeletons
const shuffle = require('shuffle-array')

//THIS FILE CONTAINS ALL QUESTION GENERATING CONSTRUCTOR FUNCTIONS

//class to create an object with a list of question pieces
class QuestionChoices {
  constructor() {
    this.questionSkeletonKey = {}
  }
  // Set the question choices based on chosen question content
  questionContentSelector(passedInOptions, choicesObject) {
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
    //recursively run selector on next array of choices, if there is one
    if (chosenOption.nextChoice) {
      this.questionContentSelector(chosenOption.nextChoice, choicesObject)
    }
  }

  // Run content selector and set certain query parameters.
  // eslint-disable-next-line complexity
  questionChoiceGenerator(optionsArray, yearRange) {
    this.questionContentSelector(optionsArray, this)
    //set the year, if it needs one
    if (this.timeFrame === 'singleSeason') {
      //eliminate strike years, BA before 1900
      while (!this.questionSkeletonKey.year || this.questionSkeletonKey.year === 1972 || this.questionSkeletonKey.year === 1981 || this.questionSkeletonKey.year === 1994 || (this.statCategory === 'BA' && this.questionSkeletonKey.year < 1900) || (this.teamOrPlayer === 'team' && this.questionSkeletonKey.year < 1900)) {
        this.questionSkeletonKey.year = randomYearSelector(yearRange)
      }
    }
    //set stat category to adjBA if it is a who led the league in BA for a year question
    if (this.statCategory === 'BA' && this.timeFrame === 'singleSeason' && this.teamOrPlayer === 'singlePlayer' && this.questionType === 'overall') {
      this.statCategory = 'adjBA'
    }
  }
}

// class to generate question objects
class QuestionObjectGenerator {
  constructor(gameId, questionNum) {
    this.question = ''
    this.answers = []
    this.correctAnswer = ''
    this.gameId = gameId
    this.questionNum = questionNum
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
    if (questionChoices.teamOrPlayer === 'wholeTeam') {
      const teamName = (questionChoices.timeFrame === 'singleSeason') ? 'name' : franchise.dataValues.name
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

        // choose other possible answers while making sure the other answer choices do not have same stat value as the chosen/correct answer and that we prevent duplicate answers.
        const possibleTeamIncorrectAnswers = queryResults.slice(teamAnswerIndex + 1)
        for (let i = 0; i < 3; i++) {
          let teamIncorrectAnswerIndex = Math.floor(Math.random() * possibleTeamIncorrectAnswers.length)
          while (possibleTeamIncorrectAnswers[teamIncorrectAnswerIndex][questionChoices.statCategory] === queryResults[teamAnswerIndex][questionChoices.statCategory] || this.answers.includes(`${possibleTeamIncorrectAnswers[teamIncorrectAnswerIndex][teamName]}`)) {
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
        let first = true
        //set to true if we have verified that there are enough usable incorrect answers for the selected correct answer
        let usableIncorrectAnswer = false
        // randomly choose a player for comparison between the 5th and 30th player
        let correctAnswerIndex = Math.floor(Math.random() * 26) + 4
        // create a list of possible other players for comparison, which includes up to the next 70 players from the queryResults
        let possibleIncorrectAnswers = (queryResults.length - correctAnswerIndex + 1 > 70) ? queryResults.slice(correctAnswerIndex + 1, correctAnswerIndex + 71) : queryResults
        //Test to make sure that the data set is valid. There need to be 3 usable incorrect answers available.
        while (!usableIncorrectAnswer) {
          //the index of the next potential usable incorrect answer
          let answerStartIndex = 0
          //find the index of the next value different from the correct answer value
          const validDataIndex = possibleIncorrectAnswers.slice([answerStartIndex]).findIndex((player) => {
            return queryResults[correctAnswerIndex][questionChoices.statCategory] !== player[questionChoices.statCategory]
          })
          //if there aren't 3 possible incorrect answers then the data set isn't valid, set answers to empty array and return an error.
          if (possibleIncorrectAnswers.length < 3) {
            this.answers = []
            return new Error('Data Set invalid, cannot generate 4 possible answers')
          //if there isn't a usable incorrect answer before the final 3 values in the array choose a new correct answer and set of possible incorrect answers.
          } else if (validDataIndex === -1 || (validDataIndex - possibleIncorrectAnswers.length) >= 3) {
            // console.log('VDI', validDataIndex)
            // console.log('PIA', possibleIncorrectAnswers.length)
            // console.log('else if')
            correctAnswerIndex = first ? 5 : correctAnswerIndex + 1
            possibleIncorrectAnswers = (queryResults.length - correctAnswerIndex + 1 > 70) ? queryResults.slice(correctAnswerIndex + 1, correctAnswerIndex + 71) : queryResults
            //First (plus the above incrementing) is used for least questions where the more unique data tends to be farther down the list.
            first = false
          } else {
            usableIncorrectAnswer = true
          }
        }

        //Set the correct answer based on the chosen index, and push it the answers array
        this.correctAnswer = `${queryResults[correctAnswerIndex].person.dataValues.nameFirst} ${queryResults[correctAnswerIndex].person.dataValues.nameLast} ~ ${queryResults[correctAnswerIndex][questionChoices.statCategory]}`
        this.answers.push(`${queryResults[correctAnswerIndex].person.dataValues.nameFirst} ${queryResults[correctAnswerIndex].person.dataValues.nameLast}`)

        const answerIndexParameter = Math.floor(possibleIncorrectAnswers.length / 3)
        const incorrectAnswerIndexArray = []
        // Find and set 3 usable incorrect answers
        for (let i = 0; i < 3; i++) {
          let incorrectAnswerIndex = Math.floor(Math.random() * answerIndexParameter) + (answerIndexParameter * i)
          //Find a valid incorrect answer (that the value doesn't equal the correct answer value and that it hasn't already been selected)
          while (queryResults[correctAnswerIndex][questionChoices.statCategory] === possibleIncorrectAnswers[incorrectAnswerIndex][questionChoices.statCategory] && incorrectAnswerIndexArray.includes(incorrectAnswerIndex)) {
            incorrectAnswerIndex = Math.floor(Math.random() * possibleIncorrectAnswers.length)
          }
          //set the valid incorrect answer to the answers array & the idxs array
          incorrectAnswerIndexArray.push(incorrectAnswerIndex)
          this.answers.push(`${possibleIncorrectAnswers[incorrectAnswerIndex].person.dataValues.nameFirst} ${possibleIncorrectAnswers[incorrectAnswerIndex].person.dataValues.nameLast}`)
        }
      }
    }
    shuffle(this.answers)
    return 'Answers created successfully'
  }
}

module.exports = { QuestionChoices, QuestionObjectGenerator }
