const mongoose = require('mongoose')

const testItemsSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  items: [
    {
      value1: String,
      rightAnswer: String,
      usersAnswer: String,
      variants: [
        {
          value: String,
          key: Number
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'test-items'})

module.exports = Test = mongoose.model('TestItemsSchema', testItemsSchema)