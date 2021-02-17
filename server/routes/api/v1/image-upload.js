const router = require('express').Router()

const upload = require('../../../services/file-upload')

const singleUpload = upload.single('image')

router.post('/upload', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.json({ error: {
        message: "Something went wrong"
    }})
    }
    return res.json({url: req.file.location})
  })
})

module.exports = router
