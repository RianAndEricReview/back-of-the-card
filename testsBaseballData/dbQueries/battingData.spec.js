const { expect } = require('chai')
const db = require('../../server/db')
//switch model to 'teams' (and update the commented variables below) to run team tests
const Batting = db.model('batting')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')
const { dataConsolidator } = require('../../GameplayFunctions/questions/questionHelperFuncs')
const { derivedBattingStats } = require('../../GameplayFunctions/questions/content/questionContent')

//These tests were made to check the validity of the Layman baseball data for making trivia questions in our game. The code used is similar, but not exact, to the code in our question creation. We used the results from these tests to determine exactly how the data was causing failures in our question creation process, and then updated the conditions in our code to only use the data we knew would be valid and lead to good questions. 
describe('Tests to determine if batting table data is valid', () => {
  let delayInMiliseconds = 0
  //This array contains each field from the batting table that is being used in question queries.
  //WHEN ADDING A QUESTION WITH A NEW STAT CAT, ADD THE STAT TO THIS ARRAY TO INCLUDE IN TESTING.
  //variable with teams stats
  // const battingStatCats = ['HR', 'hits', '2B', '3B', 'AB', 'BB', 'SB', 'SO', 'HBP', 'runs']
  //variable with singlePlayer stats
  const battingStatCats = ['HR', 'hits', '2B', '3B', 'BA', 'RBI', 'AB', 'BB', 'SB', 'SO', 'HBP', 'IBB', 'GIDP', 'runs']
  for (let statCatIdx = 0; statCatIdx < battingStatCats.length; statCatIdx++) {
    //Build the needed info to make a question query
    const relevantStatInfo = {
      questionChoices: {
        questionSkeletonKey: {
          comparativePhrasing: ['*'],
          pluralization: ['*'],
          subjectNoun: ['*'],
          timeFrame: [' * '],
          verb: ['*'],
          objectNoun: ['*'],
          mostOrLeast: ['*'],
          year: undefined
        },
        //can also test 'overall'
        questionType: 'comparison',
        //update to 'wholeTeam' to run team tests
        teamOrPlayer: 'singlePlayer',
        timeFrame: 'singleSeason',
        statCategory: undefined,
        //can also test 'least'
        mostOrLeast: 'most'
      },
      QQP: new QuestionQueryParameters(),
      isDerived: undefined,
      table: Batting,
    }
    relevantStatInfo.questionChoices.statCategory = battingStatCats[statCatIdx]
    relevantStatInfo.isDerived = derivedBattingStats.find((stat) => {
      return relevantStatInfo.questionChoices.statCategory === stat.statCat
    })
    //Before creating and executing a question query & data for every year of the stat being tested, add a delay to avoid overwhelming the database.
    setTimeout(() => {
      describe(`${battingStatCats[statCatIdx]} data valid for each year`, () => {
        const yearlyDataPromiseArray = []
        for (let i = 1871; i <= 2017; i++) {
          relevantStatInfo.questionChoices.questionSkeletonKey.year = i
          Object.getOwnPropertyNames(relevantStatInfo.QQP.constructor.prototype).forEach(method => {
            if (method !== 'constructor') {
              relevantStatInfo.QQP[method](relevantStatInfo.questionChoices, relevantStatInfo.isDerived)
            }
          })
          yearlyDataPromiseArray.push(relevantStatInfo.table.findAll({ ...relevantStatInfo.QQP }))
        }
        yearlyDataPromiseArray.forEach((promise, idx) => {
          const year = relevantStatInfo.questionChoices.questionSkeletonKey.year - yearlyDataPromiseArray.length + idx + 1
          it(`${year} has valid answers`, () => {
            return Promise.resolve(promise)
              .then(yearData => {
                //fail if an empty array is returned
                if (yearData.length < 6) {
                  throw new Error('Not enough valid data: Less than 6 data points')
                }
                const question = new QuestionObjectGenerator()
                let consolidatedDataArr = dataConsolidator(yearData, relevantStatInfo.questionChoices, relevantStatInfo.isDerived)

                //make sure that we have 10 data points, next validate that none are 0s
                for (let j = 0; j < 10; j++) {
                  if (!consolidatedDataArr[j]) {
                    throw new Error('Less than 10 answers available')
                  }
                  if (consolidatedDataArr[j][relevantStatInfo.questionChoices.statCategory] === '0' && relevantStatInfo.questionChoices.mostOrLeast === 'most') {
                    throw new Error('One of the first 10 answers was equal to 0')
                  }
                }
                // if overall, fail if the first 6 values are the same
                if (relevantStatInfo.questionChoices.questionType === 'overall' && (consolidatedDataArr[0][relevantStatInfo.questionChoices.statCategory] === consolidatedDataArr[5][relevantStatInfo.questionChoices.statCategory])) {
                  throw new Error('Overall: First 6 values are the same')
                }

                // Generate questionObject answers
                question.questionAnswerGenerator(relevantStatInfo.questionChoices, consolidatedDataArr)
                expect(question.answers, `${question.answers}`).to.have.lengthOf(4)
              })
          })
        })
      })
      run()
    }, delayInMiliseconds)
    //increase the delay between each category of DB query to prevent overwhelming the DB.
    delayInMiliseconds += 2500
  }
})
