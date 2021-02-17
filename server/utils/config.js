const dotenv = require('dotenv')
const path = require('path')

const root = path.join.bind(this, __dirname, '../../')

dotenv.config({ path: root('.env') })

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
}

// .env keys
// ACCESS_TOKEN_SECRET
// REFRESH_TOKEN_SECRET
// MONGODB_URI
// MONGODB_URI_OLD
// EMAIL_TOKEN_SECRET
// RESET_PASSWORD_TOKEN_SECRET
// AWS_SECRET_ACCESS_KEY
// AWS_ACCESS_KEY_ID
// AWS_REGION