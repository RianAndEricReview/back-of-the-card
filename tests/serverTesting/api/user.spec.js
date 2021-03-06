const { expect } = require('chai')
const request = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
const User = db.model('user')


describe('User routes', () => {
  beforeEach(() => db.sync({ force: true }))

  describe('/api/users/', () => {
    const bobsEmail = 'bob@bob.bob'
    const bobsFirstName = 'Bob'
    const bobsLastName = 'Bob'

    beforeEach(() => User.create({ email: bobsEmail, firstName: bobsFirstName, lastName: bobsLastName }))
    it('GET /api/users', () => {
      return request(app).get('/api/users').expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(bobsEmail)
        })
    })
  })
})
