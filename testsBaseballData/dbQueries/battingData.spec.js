const { expect } = require('chai')
// const should = require('chai').should()
const db = require('../../server/db')
const Batting = db.model('batting')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')
const { dataConsolidator } = require('../../GameplayFunctions/questions/questionHelperFuncs')


describe('Batting Data Stats by Year', () => {

  const findAllInfo = {
    questionChoices: {
      questionSkeletonKey: {
        comparativePhrasing: ['*'],
        pluralization: ['*'],
        subjectNoun: ['*'],
        timeFrame: [' * '],
        verb: ['*'],
        objectNoun: ['*'],
        mostOrLeast: ['*'],
        year: 1871
      },
      questionType: 'overall',
      teamOrPlayer: 'singlePlayer',
      timeFrame: 'singleSeason',
      statCategory: 'SB',
      mostOrLeast: 'most'
    },
    QQP: new QuestionQueryParameters(),
    isDerived: undefined,
    table: Batting,
  }

  describe('SB', () => {
    const HRPromiseArray = []
    // const HRQuestionAnswers = {}



    for (let i = 1871; i <= 2017; i++) {
      findAllInfo.questionChoices.questionSkeletonKey.year = i

      Object.getOwnPropertyNames(findAllInfo.QQP.constructor.prototype).forEach(method => {
        if (method !== 'constructor') {
          findAllInfo.QQP[method](findAllInfo.questionChoices, findAllInfo.isDerived)
        }
      })

      HRPromiseArray.push(findAllInfo.table.findAll({ ...findAllInfo.QQP }))
    }
    HRPromiseArray.forEach((promise, idx) => {
      const year = findAllInfo.questionChoices.questionSkeletonKey.year - HRPromiseArray.length + idx + 1
      it(`${year} answers array has a length of 4`, () => {
        return Promise.resolve(promise)
          .then(yearData => {
            const question = new QuestionObjectGenerator()
            let consolidatedDataArr = dataConsolidator(yearData, findAllInfo.questionChoices, findAllInfo.isDerived)
            // Generate questionObject answers
            question.questionAnswerGenerator(findAllInfo.questionChoices, consolidatedDataArr)
            expect(question.answers, `${question.answers}`).to.have.lengthOf(4)
          })
      })
    })
  })
})
