const listSchema = require('../models/listSchema')
const itemsSchema = require('../models/itemsSchema')
const mongoose = require('mongoose') 

exports.create = (req, res) => {
  request = req.body
  
  const item = new itemsSchema({
    _id: new mongoose.Types.ObjectId(),
    word: request.item.word,
    translate: request.item.translate,
    transcription: request.item.transcription,
    audioUrl: request.item.audioUrl,
    date: new Date()
  })
  item
    .save()
    .then(result => {
      listSchema
      .findOneAndUpdate(
        {_id: request.listId},
        {"$push": {items: result.id}}
      )
      .exec((err,doc) => {
        if (err) {
          return res.json({err, success: false})
        }
        res.json({doc: item, success: true})
      })
    })
}

exports.edit = (req, res) => {
  itemsSchema.updateMany({ _id: req.params.itemId}, { $set: req.body }, (err, result) => {
    if (err || result.nModified < 1) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.remove = (req, res) => {
  itemsSchema.deleteOne({_id: req.params.itemId}, (err, result) => {
    if (err || result.deletedCount < 1) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.removeMany = (req, res) => {
  itemsSchema.deleteMany({_id: {$in: req.body.ids}}, (err, result) => {
    if (err) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.removeUnusedItems = (req, res) => {
  listSchema
  .find({})
  .exec(async (err, doc)=> {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    itemsSchema
    .find({})
    .exec((err, items) => {
      let allItemsIds = []
      items.forEach(item => allItemsIds.push(item._id.toString()))
      console.log(allItemsIds)

      let usedItemsIds = []

      doc.forEach(list => {
        list.items.forEach(id => {
          usedItemsIds.push(id.toString())
        })
      })

      let itemsForRemove = []

      allItemsIds.forEach(item => {
        if (!usedItemsIds.includes(item)) {
          itemsForRemove.push(item)
        }
      })

      console.log(itemsForRemove)

      itemsSchema.deleteMany({_id: {$in: itemsForRemove}}, (err, result) => {
        if (err) {
          console.log(err)
          return res.json({err, success: false})
        }
        res.json({doc: result, success: true})
      })
   
    })
  })
}