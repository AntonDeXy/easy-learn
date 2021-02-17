const router = require('express').Router()
const usersControllers = require('../../../controllers/users')

router.post('/login', usersControllers.login)

router.post('/logout', usersControllers.logout)

router.put('/remove-list/:userId', usersControllers.removeObjectFromProfile)

router.put('/add-list/', usersControllers.addNewListToProfile)

router.put('/change-theme/', usersControllers.changeTheme)

router.put('/change-language/', usersControllers.changeLanguage)

router.put('/change-default-translates-language/', usersControllers.changeDefaultTranslatesLanguage)

router.put('/add-test/', usersControllers.addNewTestToProfile)

router.post('/get-new-token', usersControllers.getNewToken)

router.post('/register', usersControllers.register)

module.exports = router

