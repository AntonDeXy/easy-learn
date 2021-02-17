const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  refreshToken: {
    type: String,
    unique: true
  }
}, {collection: 'refreshTokens'})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)