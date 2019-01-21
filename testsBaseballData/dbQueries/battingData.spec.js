const { expect } = require('chai')
// const should = require('chai').should()
const db = require('../../server/db')
const Batting = db.model('batting')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')
const { dataConsolidator } = require('../../GameplayFunctions/questions/questionHelperFuncs')
const { derivedBattingStats } = require('../../GameplayFunctions/questions/content/questionContent')

describe('Batting Data Stats by Year', () => {
  let miliseconds = 0
  const battingStatCats = ['HR', 'hits', '2B', '3B', 'RBI', 'BA', 'AB', 'BB', 'SB', 'SO', 'HBP', 'IBB', 'GIDP', 'runs']
  for(let statCatIdx=0; statCatIdx<battingStatCats.length; statCatIdx++){
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
        questionType: 'overall',
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
    console.log(`${battingStatCats[statCatIdx]} ${miliseconds}`)
    setTimeout(() => {
      describe(`${battingStatCats[statCatIdx]}`, () => {
        const HRPromiseArray = []
        for (let i = 1871; i <= 2017; i++) {
          relevantStatInfo.questionChoices.questionSkeletonKey.year = i
          Object.getOwnPropertyNames(relevantStatInfo.QQP.constructor.prototype).forEach(method => {
            if (method !== 'constructor') {
              relevantStatInfo.QQP[method](relevantStatInfo.questionChoices, relevantStatInfo.isDerived)
            }
          })
          HRPromiseArray.push(relevantStatInfo.table.findAll({ ...relevantStatInfo.QQP }))
        }
        HRPromiseArray.forEach((promise, idx) => {
          const year = relevantStatInfo.questionChoices.questionSkeletonKey.year - HRPromiseArray.length + idx + 1
          it(`${year} answers array has a length of 4`, () => {
            return Promise.resolve(promise)
              .then(yearData => {
                const question = new QuestionObjectGenerator()
                let consolidatedDataArr = dataConsolidator(yearData, relevantStatInfo.questionChoices, relevantStatInfo.isDerived)
                // Generate questionObject answers
                question.questionAnswerGenerator(relevantStatInfo.questionChoices, consolidatedDataArr)
                expect(question.answers, `${question.answers}`).to.have.lengthOf(4)
              })
          })
        })
      })
      run()
    }, miliseconds)
    miliseconds += 3000
  }
})
