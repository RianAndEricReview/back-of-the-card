const router = require('express').Router()

router.use('/placeholder', require('./placeholder'))
router.use('/users', require('./users'))
router.use('/games', require('./games'))
router.use('/gamePlayer', require('./gamePlayer'))
router.use('/playerQuestionResults', require('./playerQuestionResults'))

router.use((req, res, next) => {
  const err = new Error('Not found.')
  err.status = 404
  next(err)
})

module.exports = router
