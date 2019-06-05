const { expect } = require('chai')
const request = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index')
const io = require('socket.io-client')
const ioServer = require('socket.io').listen(8080)
app.io = ioServer
const Gametype = db.model('gametype')
const User = db.model('user')

describe('Games routes', () => {
  beforeEach(() => db.sync({ force: true }))

  describe('api/games', () => {
    const gametype = { id: 1, name: 'onePlayer', description: '1 Player Game', enabled: true, maxPlayers: 1 }
    const user = { id: 1, email: 'bob@bob.bob' }
    const playerId = user.id
    const open = true

    describe('Creating and Adding players to a game', () => {
      let socket
      beforeEach(done => {
        Gametype.create(gametype)
        User.create(user)
        socket = io.connect('http://localhost:8080', {
          'reconnection delay': 0,
          'reopen delay': 0,
          'force new connection': true,
          transports: ['websocket']
        })
        socket.on('connect', () => {
          done()
        })
      })

      afterEach(done => {
        ioServer.close()
        done()
      });

      it('POST api/games: game creation', () => request(app)
        .post('/api/games')
        .send({ gametypeId: gametype.id, open, playerId })
        .expect(201)
        .then(res => {
          expect(res.body.id).to.not.be.equal(null)
          expect(res.body.currentQuestion).to.equal(1)
          expect(res.body.open).to.be.equal(open)
          expect(res.body.gametypeId).to.be.equal(gametype.id)
        }))
    })
  })
})
