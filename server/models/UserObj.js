const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserObjSchema = new Schema(
  {
    _id: mongoose.Schema.ObjectId,
    username: {
      type: String,
      require: true,
      unique: true
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'light'
    },
    role: {
      type: String,
      default: 'user'
    },
    registerDate: {
      type: Date,
      default: Date.now()
    },
    language: {
      type: String,
      default: 'en'
    },
    defaultTranslatesLanguage: {
      type: String,
      default: 'ru'
    },
    addedLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test' }]
  },
  { collection: 'users' }
)

module.exports = User = mongoose.model('User', UserObjSchema)
