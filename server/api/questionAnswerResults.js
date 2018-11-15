const router = require('express').Router()
const { QuestionAnswerResults } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  QuestionAnswerResults.bulkCreate(req.body)
    .then(() => {
      res.status(204)
    })
    .catch(next)
})
