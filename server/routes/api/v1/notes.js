const router = require('express').Router()
const notesControllers = require('../../../controllers/note')

router.get('/:authorId/', notesControllers.notesByAuthor)

router.post('/new/', notesControllers.create)

router.put('/edit/:noteId/', notesControllers.edit)

router.delete('/remove/:noteId/', notesControllers.remove)

module.exports = router

