const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080

//logging middleware
app.use(morgan('dev'))

//body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

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
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public'))
})

//Error Handling
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'internal server error')
})

//Initialize Server
app.listen(port, () => {
  console.log(`The server listening on port ${port}`)
})
