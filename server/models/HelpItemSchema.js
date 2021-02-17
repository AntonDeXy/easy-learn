const mongoose = require('mongoose')

const HelpItemsSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  title: String,
  content: String,
  authorId: String,
  date: {
    type: Date,
    defaulr: Date.now()
  }
}, {collection: 'helpItems'})

module.exports = mongoose.model('HelpItem', HelpItemsSchema)