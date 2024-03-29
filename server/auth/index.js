const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (!user) {
        console.log('User not found: ', req.body.email)
        res.status(401).send('Wrong username and/or password.')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user: ', req.body.email)
        res.status(401).send('Wrong username and/or password.')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user.sanitize())))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.signUpUser(req.body, req, res, next)
})

router.post('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res, next) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
