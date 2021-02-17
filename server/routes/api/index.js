const router = require('express').Router()

const v1 = require('./v1')

router.use('/v1', v1)

router.use('*', (_, res) =>
  res.status(404).json({
    success: false,
    message: 'No such route found'
  }))

module.exports = router