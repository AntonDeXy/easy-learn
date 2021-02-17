const mongoose = require('mongoose')

const testsSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  userId: String,
  type: String,
  questionsCount: Number,
  rightAnswersCount: Number,
  listName: String,
  items: {type: mongoose.Schema.Types.ObjectId, ref: 'TestItemsSchema' },
  // items: [
  //   {
  //     value1: String,
  //     rightAnswer: String,
  //     usersAnswer: String,
  //     variants: [
  //       {
  //         value: String,
  //         key: Number
  //       }
  //     ]
  //   }
  // ],
  date: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'tests'})

module.exports = Test = mongoose.model('Test', testsSchema)