const { expect } = require('chai')
const request = require('supertest')
const db = require('../server/db')
const app = require('../server/index')
const io = require('socket.io-client')
const ioServer = require('socket.io').listen(8080)
app.io = ioServer
const { Game, Gametype, User, GamePlayer, Question } = require('../server/db/models')
// const Gametype = db.model('gametype')
// const User = db.model('user')
// const GamePlayer = db.model('gamePlayer')
// const Question = db.model('question')

describe('Games routes', () => {
  before(() => db.sync())
  after(() => {
    console.log('cleared the DB$$$$$$$$$$$$$$$')
    db.sync({ force: true })
  })

  describe('api/games', () => {
    const gametype = { id: 1, name: 'onePlayer', description: '1 Player Game', enabled: true, maxPlayers: 1 }
    const user = { id: 1, email: 'bob@bob.bob' }
    const playerId = user.id

    describe('Creating and Adding players to a game', () => {
      let socket
      before(done => {
        User.create(user)
        Gametype.create(gametype)
        .then((createdGametype) => {
          Game.create({gametypeId: createdGametype.dataValues.id, open: true})
        })

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

      it('POST api/games: game creation', () => request(app)
        .post('/api/games')
        .send({ gametypeId: gametype.id, open: false })
        .expect(201)
        .then(res => {
          expect(res.body.id).to.not.be.equal(null)
          expect(res.body.currentQuestion).to.equal(1)
          expect(res.body.open).to.be.equal(false)
          expect(res.body.gametypeId).to.be.equal(gametype.id)
        }))

      //to be moved to question.spec.js after game API is refactored and question creation is relocated
      xit('POST api/games: question creation', () => request(app)
        .post('/api/games/${joinedGame.id}/createQuestions')
        .send({ gametypeId: gametype.id, open, playerId })
        .expect(201)
        .then(res => {
          // console.log('*****RB******', res.body, 'IDDDD', res.body.id)
          return Question.findAll()
            .then(foundQuestions => {
                        console.log('*****RB******', foundQuestions.length)
              expect(foundQuestions).to.have.length(10)
            })
        }))

      //to be moved to gamePlayer.spec.js after game API is refactored and gamePlayer creation is relocated
      xit('POST api/games: initial gamePlayer creation', () => request(app)
        .post('/api/games')
        .send({ gametypeId: gametype.id, open, playerId })
        .expect(201)
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
