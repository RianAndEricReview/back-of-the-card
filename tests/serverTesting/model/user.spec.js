const { expect } = require('chai')
const db = require('../../../server/db')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => db.sync({ force: true }))

  let bob
  beforeEach(() => User.create({ email: 'bob@bob.bob', password: 'iambob', firstName: 'Bob', lastName: 'Bob' })
    .then(user => {
      bob = user
    })
  )

  describe('Instance methods', () => {
    describe('correctPassword', () => {

      it('returns true if the password is correct', () => {
        expect(bob.correctPassword('iambob')).to.be.equal(true)
      })
      it('returns false if the password is incorrect', () => {
        expect(bob.correctPassword('iamnotbob')).to.be.equal(false)
      })
    })
  })

  describe('Class methods', () => {
    describe('generateSalt', () => {

      it('returns a salted password', () => {
        expect(bob.salt()).to.be.an('string')
        expect(bob.salt).to.not.be.equal(bob.password)
      })
    })
  })
})
