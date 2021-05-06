const express = require('express')
const router = express.Router()
const Shop = require("../../models/shop")

//Homepage
router.get('/', (req, res) => {
  const noLightBox = "none"
  let categoryArr=[]
  Shop.find()
  .lean()
  .then(data =>{
    for(x in data){ categoryArr.push(data[x].category) }
    categoryArr = [...new Set(categoryArr)]
    return data
  })
  .then(data => res.render('index',{restaurants: data, showLightBox: noLightBox, categories: categoryArr}))
  .catch(error => console.error(error))  
})


module.exports = router