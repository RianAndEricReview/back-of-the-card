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
      statCategory: 'HR',
      mostOrLeast: 'most'
    },
    QQP: new QuestionQueryParameters(),
    isDerived: undefined,
    table: Batting,
  }

  describe('Batting Data', () => {
    describe('HR', () => {
      const HRPromiseArray = []
      // const HRQuestionAnswers = {}

      it('answers array has a length of 4', () => {

        for (let i = 2000; i <= 2017; i++){
          findAllInfo.questionChoices.questionSkeletonKey.year = i
          
          Object.getOwnPropertyNames(findAllInfo.QQP.constructor.prototype).forEach(method => {
            if (method !== 'constructor') {
              findAllInfo.QQP[method](findAllInfo.questionChoices, findAllInfo.isDerived)
            }
          })

          HRPromiseArray.push(findAllInfo.table.findAll({ ...findAllInfo.QQP }))
        }
        return Promise.all(HRPromiseArray)
        .then(foundInfo => {
          foundInfo.forEach((yearData, idx) => {
            const question = new QuestionObjectGenerator()
            const year = findAllInfo.questionChoices.questionSkeletonKey.year - foundInfo.length + idx + 1
            let consolidatedDataArr = dataConsolidator(yearData, findAllInfo.questionChoices, findAllInfo.isDerived)
                // Generate questionObject answers
                question.questionAnswerGenerator(findAllInfo.questionChoices, consolidatedDataArr)
                if(idx === 7) question.answers.pop()
                expect(question.answers, `${year}`).to.have.lengthOf(4)
          })
        })
      })
    })
  })

