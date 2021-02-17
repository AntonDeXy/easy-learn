const router = require('express').Router()
const testsControllers = require('../../../controllers/test')

router.post('/create-test', testsControllers.create)

module.exports = router