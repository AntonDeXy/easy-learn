const router = require('express').Router()
const path = require('path')

// Custom routes
const api = require('./api')

router.use('/api', api)

// Send react app to all other requests
// router.use('*', (_, res) =>
//   res.sendFile(path.join(__dirname, '../../../client/build/index.html')))

module.exports = router