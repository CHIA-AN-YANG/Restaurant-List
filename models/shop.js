const mongoose = require('mongoose')

//定義資料結構 (Ref:https://mongoosejs.com/docs/schematypes.html)
const shopSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  name_en: {
    type:String,
    required: false
  },
  category: {
    type: String, 
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type:String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
})

module.exports = mongoose.model('Shop', shopSchema)


