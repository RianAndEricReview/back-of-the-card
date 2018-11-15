const router = require('express').Router()
const { PlayerQuestionResult } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('The body!!!!!!!', req.body)
  PlayerQuestionResult.bulkCreate(req.body)
    .then(() => {
      console.log('ARe we in here???')
      res.status(204)
    })
    .catch(next)
})
