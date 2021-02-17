const testsSchema = require('../models/testsSchema')
const mongoose = require('mongoose') 
const testItemsSchema = require('../models/testItemsSchema')

exports.create = (req, res) => {
  request = req.body

  const testItems = new testItemsSchema({
    _id: new mongoose.Types.ObjectId(),
    items: request.test.items,
    date: Date.now()
  })

  testItems
    .save()
    .then(resultTestItems => {
      const test = new testsSchema({
        _id: new mongoose.Types.ObjectId(),
        userId: request.userId,
        type: request.test.type,
        questionsCount: request.test.questionsCount,
        rightAnswersCount: request.test.rightAnswersCount,
        listName: request.test.listName,
        items: resultTestItems.id,
        date: Date.now()
      })
      test
        .save()
        .then(result => res.json({doc: result, success: true}))
        .catch(err => res.json({success: false}))
    })
    .catch(err => res.json({success: false}))
}