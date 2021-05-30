const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    pattern: /[\w\d\S]/s
  },
  user_email: {
    type: String,
    required: true,
    maxlength: 127
  },
  password: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('User', userSchema)