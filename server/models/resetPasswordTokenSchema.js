const mongoose = require('mongoose')

const resetPasswordTokenSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  resetPasswordToken: {
    type: String,
    unique: true
  }
}, {collection: 'resetPasswordTokens'})

module.exports = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema)