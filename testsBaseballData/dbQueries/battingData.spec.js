const { expect } = require('chai')
const db = require('../../server/db')
const Batting = db.model('batting')
const { QuestionQueryParameters } = require('../../GameplayFunctions/questions/questionQueryGenerator')
const { QuestionObjectGenerator } = require('../../GameplayFunctions/questions/questionGenerator')


describe('User routes', () => {

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
      questionType: 'comparison',
      teamOrPlayer: 'singlePlayer',
      timeFrame: 'singleSeason',
      statCategory: 'HR',
      mostOrLeast: 'most'
    },
    QQP: new QuestionQueryParameters(),
    isDerived: undefined,
    table: Batting,
    question: new QuestionObjectGenerator(),
  }

  Object.getOwnPropertyNames(findAllInfo.QQP.constructor.prototype).forEach(method => {
    if (method !== 'constructor') {
      findAllInfo.QQP[method](findAllInfo.questionChoices, findAllInfo.isDerived)
    }
  })
  console.log('FAIIIIII', findAllInfo)

  describe.skip('Instance methods', () => {
    describe('correctPassword', () => {

      it('returns true if the password is correct', () => {
        expect(bob.correctPassword('iambob')).to.be.equal(true)
      })
      it('returns false if the password is incorrect', () => {
        expect(bob.correctPassword('iamnotbob')).to.be.equal(false)
      })
    })
  })

  describe.skip('Class methods', () => {
    describe('generateSalt', () => {

      it('returns a salted password', () => {
        expect(bob.salt()).to.be.an('string')
        expect(bob.salt).to.not.be.equal(bob.password)
      })
    })
  })
})
