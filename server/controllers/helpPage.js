const HelpItemsSchema = require('../models/HelpItemSchema')
const mongoose = require('mongoose') 

exports.getAll = (req, res) => {
  HelpItemsSchema
  .find({})
  .exec((err, doc) => {
    if (err) return res.json({succes: false})
    res.json({data: doc, success: true})
  })
}

exports.create = (req, res) => {
  request = req.body
  const item = new HelpItemsSchema({
    _id: new mongoose.Types.ObjectId(),
    title: request.item.title,
    content: request.item.content,
    authorId: request.item.authorId,
    date: new Date()
  })
  item
    .save()
    .then(result => res.json({doc: result, success: true}))
    .catch(err => res.json({err, success: false}))
}

exports.edit = (req, res) => {
  HelpItemsSchema.updateMany({ _id: req.params.itemId}, { $set: req.body }, (err, result) => {
    if (err || result.nModified < 1) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.remove = (req, res) => {
  HelpItemsSchema.deleteOne({_id: req.params.itemId}, (err, result) => {
    if (err || result.deletedCount < 1) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}