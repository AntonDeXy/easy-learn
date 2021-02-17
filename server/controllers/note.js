const noteSchema = require('../models/notesSchema')
const mongoose = require('mongoose') 

exports.notesByAuthor = (req, res) => {
  noteSchema
  .find({authorId: req.params.authorId})
  .exec((err, doc)=> {
    if (err) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({data: doc, success: true})
  })
}

exports.create = (req, res) => {
  request = req.body
  const note = new noteSchema({
    _id: new mongoose.Types.ObjectId(),
    authorId: request.authorId,
    content: request.content,
    date: new Date(),
  })
  note
    .save()
    .then(result => res.json({note, success: true}))
    .catch(error => res.json({error, success: false}))
}

exports.edit = (req, res) => {
  noteSchema.update({ _id: req.params.noteId}, { content: req.body.newContent }, (err, result) => {
    if (err || result.nModified < 1) {
      console.log(err)
      return res.json({error, success: false})
    }
    res.json({data: result, success: true})
  })
}

exports.remove = (req, res) => {
  noteSchema.deleteOne({_id: req.params.noteId}, (err, result) => {
    if (err) {
      console.log(err)
      return res.json({error, success: false})
    }
    res.json({success: true})
  })
}