const { expect } = require('chai')
const request = require('supertest')
const db = require('../server/db')
const app = require('../server/index')
const io = require('socket.io-client')
const ioServer = require('socket.io').listen(8080)
app.io = ioServer
const { Game, Gametype, User, GamePlayer } = require('../server/db/models')

describe('Games routes', () => {
  before(() => db.sync())
  after(() => {
    console.log('cleared the DB$$$$$$$$$$$$$$$')
    db.sync({force: true})
  })

  describe('api/games', () => {
    const gametype = { id: 1, name: 'onePlayer', description: '1 Player Game', enabled: true, maxPlayers: 1 }
    const user = { id: 1, email: 'bob@bob.bob' }
    const playerId = user.id
    let sampleGame

    describe('Creating and Adding players to a game', () => {
      let socket
      before(done => {
        User.create(user)
        Gametype.create(gametype)
        //   .then((createdGametype) => {
        //     return Game.create({ gametypeId: createdGametype.dataValues.id, open: true })
        //       .then((createdGame) => {
        //         sampleGame = createdGame.dataValues
        //       })
        //   })

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

      after(done => {
        ioServer.close()
        done()
      });

      xit('POST api/games: game creation', () => request(app)
        .post('/api/games')
        .send({ gametypeId: 100, open: false })
        .expect(201)
        .then(res => {
          expect(res.body.id).to.not.be.equal(null)
          expect(res.body.currentQuestion).to.equal(1)
          expect(res.body.open).to.be.equal(false)
          expect(res.body.gametypeId).to.be.equal(100)
        })
      )

      //tests for question creation are route only, actual creation of questions will be tested in questionCreatorFunc tests.
      xit('POST api/games: question creation', () => {
        return request(app)
        .post(`/api/games/100/createQuestions`)
        .send({ gametypeId: 100 })
        .then(res => {
          expect(res.status).to.be.equal(200)
        })
      })
      //testing an incorrect gametype that causes an error in the route
      xit('POST api/games: incorrect gametype', () => request(app)
        .post(`/api/games/100/createQuestions`)
        .send({ gametypeId: 1001 })
        .expect(500)
      )


      //to be moved to gamePlayer.spec.js after game API is refactored and gamePlayer creation is relocated
      it('POST api/games: initial gamePlayer creation', () => request(app)
        .put(`/api/games/100/addNewPlayer`)
        .send({ playerId })
        .expect(200)
        .then(res => {
          return GamePlayer.findOne({ where: { gameId: res.body.id } })
            .then(foundGamePlayer => {
              expect(foundGamePlayer.gameId).to.be.equal(res.body.id)
              expect(foundGamePlayer.userId).to.be.equal(playerId)
            })
        }))
    })
  })
})
