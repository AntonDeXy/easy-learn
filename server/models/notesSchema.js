const mongoose = require('mongoose')

const itemsSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  authorId: String,
  content: String,
}, {collection: 'notes'})

module.exports = mongoose.model('Note', itemsSchema)