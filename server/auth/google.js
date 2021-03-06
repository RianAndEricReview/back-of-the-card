const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.')

} else {

  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  }

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id
    const firstName = profile.givenName
    const lastName = profile.familyName
    const screenName = profile.displayName
    const email = profile.emails[0].value
    const profileImage = profile.photos[0].value

    User.findOne({ where: { googleId } })
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({ firstName, lastName, screenName, email, googleId, profileImage, playerImage: profileImage })
          .then(createdUser => {
            return done(null, createdUser)
          })
      ))
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('google', { scope: 'email' }))

  router.get('/callback', passport.authenticate('google', {
    failureRedirect: '/login'
  }),
    function (req, res) {
      if (req.user._changed.firstName !== false) {
        res.redirect('/')
      } else {
        res.redirect(`/player-info/${req.user.dataValues.id}`)
      }
    }
  )

}
