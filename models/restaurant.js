const mongoose = require('mongoose')

//定義資料結構 (Ref:https://mongoosejs.com/docs/schematypes.html)
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  name_en: String,
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
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)

