const router = require('express').Router()

router.use('/placeholder', require('./placeholder'))

router.use((req, res, next) => {
  const err = new Error('Not found.')
  err.status = 404
  next(err)
})

module.exports = router
