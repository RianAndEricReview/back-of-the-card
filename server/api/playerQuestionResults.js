const router = require('express').Router()
const { PlayerQuestionResult } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  PlayerQuestionResult.bulkCreate(req.body)
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
})
