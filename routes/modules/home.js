const express = require('express')
const router = express.Router()
const Shop = require("../../models/shop")

//Homepage
router.get('/', (req, res) => {
  const userId = req.user._id
  let categoryArr=[]
  Shop.find({userId})
  .lean()
  .then(data =>{
    for(x in data){ categoryArr.push(data[x].category) }
    categoryArr = [...new Set(categoryArr)]
    return data
  })
  .then(data => res.render('index',{restaurants: data, categories: categoryArr}))
  .catch(error => console.error(error))  
})


module.exports = router