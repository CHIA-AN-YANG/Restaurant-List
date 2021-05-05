const express = require('express')
const router = express.Router()
const Shop = require("../../models/shop")

//Homepage
router.get('/', (req, res) => {
  const noLightBox = "none"
  Shop.find()
  .lean()
  .then(data => res.render('index',{restaurants: data, showLightBox: noLightBox}))
  .catch(error => console.error(error))  
})


module.exports = router