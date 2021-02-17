const listSchema = require('../models/listSchema')
const itemsSchema = require('../models/itemsSchema')
const mongoose = require('mongoose') 

exports.listsByAuthor = (req, res) => {
  listSchema
  .find({authorId: req.params.authorId})
  .populate('items')
  .exec((err, doc) => {
    if (err) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({data: doc, success: true})
  })
}

exports.listById = (req, res) => {
  listSchema
  .find({_id: req.params.listId})
  .populate('items')
  .exec((err, doc)=> {
    if (err || !doc || doc.length < 1) {
      return res.json({isExist: false})
    }
    return res.json({isExist: true, list: doc})
  })
}

exports.create = (req, res) => {
  request = req.body
  const list = new listSchema({
    _id: new mongoose.Types.ObjectId(),
    name: request.name,
    items: request.items || [],
    authorId: request.authorId,
  })
  list
    .save()
    .then(async (result) => {
      res.json({doc: await result.populate('items').execPopulate(), success: true})
    })
    .catch(err => res.json({success: false}))
}

exports.edit = (req, res) => {
  listSchema.updateMany({ _id: req.params.listId}, { $set: req.body }, (err, result) => {
    if (err || result.nModified < 1) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.remove = (req, res) => {
  listSchema
  .findOne({_id: req.params.listId})
  .exec((err, doc) => {
    removeItems(doc.items)
    removeList(req.params.listId)
  })

  const removeList = (listId) => {
    listSchema.deleteOne({_id: req.params.listId}, (err, result) => {
      if (err || result.deletedCount < 1) {
        console.log(err)
        return res.json({success: false})
      }
      
      res.json({success: true})
    })
  }

  const removeItems = (ids) => {
    itemsSchema.deleteMany({_id: {$in: ids}}, (err, result) => {
      if (err) {
        return console.log(err)
      } else {
        console.log(result)
      }
    })
  }
}

exports.addNewListToProfile = (req, res) => {
  listSchema
    .find({_id: req.body.listForDuplicate})
    .populate('items')
    .exec((err, doc) => {
      if (err) return console.log(err)
      console.log(doc[0])
      let words = doc[0].items.map(item => {
        return ({
          _id: new mongoose.Types.ObjectId(),
          word: item.word, 
          translate: item.translate
        })
      })
      let wordsIds = words.map(item => item._id.toString())
      
      itemsSchema
        .insertMany(words, (err, docs) => {
          if (err) return console.log(err)
          console.log(docs)
        })

      const newList = new listSchema({
        _id: new mongoose.Types.ObjectId(),
        name: doc[0].name,
        items: wordsIds || [],
        authorId: req.body.userId,
        date: new Date(),
      })

      newList
        .save()
        .then(async (result) => {
          res.json({doc: await result.populate('items').execPopulate(), success: true})
        })
        .catch(err => res.json({success: false}))

      // listSchema
      //   .findOneAndUpdate(
      //     {_id: doc[0].id},
      //     {'$push': {items: wordsIds}}
      //   )
      //   .exec((err,doc) => {
      //     if (err) {
      //       return res.json({err, success: false})
      //     }
      //     res.json({doc, success: true})
      //   })
    })
  }
  

  // const list = new listSchema({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: req.body.name,
  //   items: req.body.items || [],
  //   authorId: req.body.authorId,
  //   date: new Date(),
  // })
  // list
  //   .save()
  //   .then(async (result) => {
  //     res.json({doc: await result.populate('items').execPopulate(), success: true})
  //   })
  //   .catch(err => res.json({success: false}))
// }