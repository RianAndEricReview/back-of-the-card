const { expect } = require('chai')
const db = require('../../server/db')
const Batting = db.model('batting')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')
const { dataConsolidator } = require('../../GameplayFunctions/questions/questionHelperFuncs')
const { derivedBattingStats } = require('../../GameplayFunctions/questions/content/questionContent')

describe('Tests to determine if batting table data is valid', () => {
  let delayInMiliseconds = 0
  //This array contains each field from the batting table that is being used in question queries.
  //WHEN ADDING A QUESTION WITH A NEW STAT CAT, ADD THE STAT TO THIS ARRAY TO INCLUDE IN TESTING.
  const battingStatCats = ['HR', 'hits', '2B', '3B', 'RBI', 'BA', 'AB', 'BB', 'SB', 'SO', 'HBP', 'IBB', 'GIDP', 'runs']
  for(let statCatIdx=0; statCatIdx<battingStatCats.length; statCatIdx++){
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
        questionType: 'comparison',
        teamOrPlayer: 'singlePlayer',
        timeFrame: 'singleSeason',
        statCategory: undefined,
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
                if(!yearData.length) {
                  throw new Error('No valid data: All Nulls')
                }
                const question = new QuestionObjectGenerator()
                let consolidatedDataArr = dataConsolidator(yearData, relevantStatInfo.questionChoices, relevantStatInfo.isDerived)
                
                if (relevantStatInfo.questionChoices.mostOrLeast === 'most') {
                  //check first 10, fail if any are nulls or 0s
                  for (let j = 0; j < 10; j++) {
                    if (consolidatedDataArr[j][relevantStatInfo.questionChoices.statCategory] === '0') {
                      throw new Error('Null or 0 in first 10 answers')
                    }
                  }
                  // if overall, fail if the first 6 values are the same
                  if (relevantStatInfo.questionChoices.questionType === 'overall' && (consolidatedDataArr[0][relevantStatInfo.questionChoices.statCategory] === consolidatedDataArr[5][relevantStatInfo.questionChoices.statCategory])) {
                    throw new Error('Overall: First 6 values are the same')
                  }
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
    delayInMiliseconds += 2600
  }
})
