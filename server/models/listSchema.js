const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  authorId: String,
  date: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'lists'})

module.exports = mongoose.model('List', listSchema)