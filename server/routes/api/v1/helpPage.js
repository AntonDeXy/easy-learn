const router = require('express').Router()
const helpPageController = require('../../../controllers/helpPage')

router.get('/get-all/', helpPageController.getAll)

router.post('/new/', helpPageController.create)

router.put('/edit/:itemId/', helpPageController.edit)

router.delete('/remove/:itemId/', helpPageController.remove)

module.exports = router

