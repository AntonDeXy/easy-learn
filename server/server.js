const { resolve } = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})

const express = require('express')
const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId
const app = express()
const cors = require('cors')
const mongoose = require('mongoose') 
const articleSchema = require('./models/itemsSchema')
const cookieParser = require('cookie-parser')
const listsControllers = require('./controllers/list')
const router = require('./routes/index')
const path = require('path')

let port = process.env.PORT || 5001
const url = process.env.MONGODB_URI

app.use(cors('*'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

app.use(express.static(path.join(__dirname, '../client/build')))

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).catch(err => console.log(err))

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
})

app.listen(port, '0.0.0.0', () => {
  console.log("API started")
})
