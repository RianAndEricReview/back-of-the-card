const { expect } = require('chai')
const request = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
const Gametype = db.model('gametype')

describe('Games routes', () => {
  beforeEach(() => db.sync({ force: true }))

  describe('api/games', () => {
    const gametype = { id: 1, name: 'onePlayer', description: '1 Player Game', enabled: true, maxPlayers: 1 }
    const open = true

    beforeEach(() => Gametype.create(gametype))
    it('POST api/games: game creation', () => request(app)
      .post('/api/games')
      .send({ gametypeId: gametype.id, open })
      .expect(201)
      .then(res => {
        expect(res.body.id).to.not.be.equal(null)
        expect(res.body.currentQuestion).to.equal(1)
        expect(res.body.open).to.be.equal(open)
        expect(res.body.gametypeId).to.be.equal(gametype.id)
      }))
  })
})

