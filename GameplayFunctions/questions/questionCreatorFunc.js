const { randomYearSelector, dataConsolidator } = require('./questionHelperFuncs')
const { Question } = require('../../server/db/models')

// function used to create valid questions. It is called recursively when non-valid questions are found.
// REFACTOR: SHOULD BE MADE INTO A HELPER FUNCTION
const questionCreatorFunc = (questionInfoArr, gameRoomSocket) => {
  const questionsArr = []
  const newQuestionInfoArr = []
  Promise.all(questionInfoArr.map(findInfo => findInfo.table.findAll({ ...findInfo.QQP })))
    .then(foundInfo => {
      foundInfo.forEach((data, idx) => {
        let dataIsGood = true
        let consolidatedDataArr
        // do not use a data set that is too short to get initial correct answer
        if (data.length < 6) {
          dataIsGood = false
        } else {
          //run the data consolidator and then check the data it returns
          consolidatedDataArr = dataConsolidator(data, questionInfoArr[idx].questionChoices, questionInfoArr[idx].isDerived)

          // for MOST questions check to make sure data is valid
          if (questionInfoArr[idx].questionChoices.mostOrLeast === 'most') {
            // make sure there are enough data points after the sixth to make a good question
            const failsafePlayer = consolidatedDataArr[5]
            const firstValidPlayerIdx = consolidatedDataArr.findIndex(player => failsafePlayer[questionInfoArr[idx].questionChoices.statCategory] !== player[questionInfoArr[idx].questionChoices.statCategory])
            if (consolidatedDataArr.slice(firstValidPlayerIdx).length < 30 && questionInfoArr[idx].questionChoices.questionType === 'singlePlayer') {
              dataIsGood = false
            }

            //make sure that we have 10 data points, next validate that none are 0s
            for (let j = 0; j < 10; j++) {
              if (!consolidatedDataArr[j]) {
                dataIsGood = false
                break
              } else if (consolidatedDataArr[j][questionInfoArr[idx].questionChoices.statCategory] === '0') {
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
            if (consolidatedDataArr.slice(firstValidPlayerIdx).length < 30 && questionInfoArr[idx].questionChoices.questionType === 'singlePlayer') {
              dataIsGood = false
            }
            //check to make sure there are 10 data points
            for (let j = 0; j < 10; j++) {
              if (!consolidatedDataArr[j]) {
                dataIsGood = false
                break
              }
            }
          }
        }

        if (dataIsGood) {
          // Generate questionObject answers
          questionInfoArr[idx].question.questionAnswerGenerator(questionInfoArr[idx].questionChoices, consolidatedDataArr)
          questionsArr.push(questionInfoArr[idx].question)
          questionInfoArr[idx].question.questionTextGenerator(questionInfoArr[idx].questionChoices)

          //if answers array comes back from the answer generator as empty array pick a new year for the query
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

      // Post the good questions to DB and socket the number of good questions made
      if (questionsArr.length > 0) {
        return Promise.all(questionsArr.map(question => Question.create(question)))
          .then(() => {
            const questionCount = questionsArr.length
            gameRoomSocket.in(`GameRoom${game.id}`).emit('questionsAdded', questionCount)
            // use the updated queries of the bad questions that were created to recursively create good ones
            if (newQuestionInfoArr.length > 0) {
              questionCreatorFunc(newQuestionInfoArr, gameRoomSocket)
            }
          })
          .catch(next)
      }

      // if no good questions were created, recursively run the function if there are bad questions
      if (newQuestionInfoArr.length > 0) {
        questionCreatorFunc(newQuestionInfoArr, gameRoomSocket)
      }

    })
    .catch(next)
}