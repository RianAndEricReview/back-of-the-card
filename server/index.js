const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./db')
const socketio = require('socket.io')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const passport = require('passport')
const compression = require ('compression')
const sessionStore = new SequelizeStore({ db })
const app = express()
const port = process.env.PORT || 8080

if (process.env.NODE_ENV !== 'production') require('../secrets')

//passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
  .then(user => done(null, user))
  .catch(done))

const createApp = () => {

  //logging middleware
  app.use(morgan('dev'))

  //body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

    // compression middleware
    app.use(compression())

  //session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'PLACEHOLDER SECRET',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  //server routes
  app.use('/api', require('./api'))
  app.use('/auth', require('./auth'))

  //serve static files
  app.use(express.static(path.join(__dirname, '../public')))

  //if any remaining requests have an extention send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('File not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  //send index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'))
  })

  //Error Handling
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'internal server error')
  })
}

const startListening = () => {
  //Initialize Server
  const server = app.listen(port, () => {
    console.log(`The server listening on port ${port}`)
  })

  // Initialize socket connection
  const io = socketio(server)
  require('./socket')(io)
}

// Sync DB
const syncDB = () => db.sync()


if (require.main === module) {
  sessionStore.sync()
    .then(syncDB)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}
