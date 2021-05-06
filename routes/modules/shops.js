const express = require('express')
const router = express.Router()
const Shop = require("../../models/shop")
let categoryArr = []

//Search
router.get('/search', (req, res) => {
  const noLightBox = "none"
  const keyword = req.query.keyword
  Shop.find()
  .lean()
  .then(data => {

    categoryArr.length = 0
    for(x in data){ categoryArr.push(data[x].category) }

    let searchArr = []
    let zhTwArr = data.filter(el =>{ return el.name.toString().toLowerCase().includes(keyword.toString().toLowerCase())})
    let enArr = data.filter(el =>{ if(el['name_en']){ return el['name_en'].toString().toLowerCase().includes(keyword.toString().toLowerCase())}})
    searchArr = [...new Set(zhTwArr.concat(enArr))]
    return searchArr })
  .then(els => res.render('index',{restaurants: els, showLightBox: noLightBox, categories: categoryArr}))
  .catch(error => console.error(error))  
})
router.get('/category/:category', (req, res) => {
  const noLightBox = "none"
  const category = req.params.category
  let filteredData = []
  Shop.find()
  .lean()
  .then(data => { 
    categoryArr.length = 0
    for(x in data){ categoryArr.push(data[x].category) }
    filteredData = data.filter(el =>{ return el.category==category }) 
  })
  .then(() =>{
    const dataSet = [...new Set(filteredData)]
    res.render('index',{restaurants: dataSet, showLightBox: noLightBox, categories: categoryArr})})
  .catch(error => console.error(error))
})

//Create
router.get('/add', (req, res) => {
  return res.render('add')
})
router.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  let description = "Edit to enter some description..."
  let name_en = " "
  let google_map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d925803.4062173894!2d121.36451233794975!3d24.985855787588882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab75696cfd03%3A0xb27c20e0feb23843!2zTm93aGVyZSDnhKHmiYA!5e0!3m2!1szh-TW!2stw!4v1620234088028!5m2!1szh-TW!2stw"
  if(req.body.description){description=req.body.description}
  if(req.body.name_en){name_en=req.body.name_en}
  if(req.body.google_map){google_map= req.body.google_map}

  return Shop.create({ name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Read
router.get('/:id', (req, res) => {
  const id = req.params.id
  const showLightBox = "block";
  Shop.find()
  .lean()
  .then(data => {
    const resSingle = data.find(el => el._id.toString() === id.toString());
    res.render('index',{restaurants: data, restaurant: resSingle, showLightBox:showLightBox}
  )})
  .catch(error => console.error(error))  
})

//Update
router.get('/:id/edit', (req, res) => {
  const id=req.params.id;
  return Shop.findById(id)
  .lean()
  .then(data => {
    res.render('edit',{restaurant: data}) 
  })
  .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  let description = "Edit to enter some description..."
  let name_en = " "
  let google_map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d925803.4062173894!2d121.36451233794975!3d24.985855787588882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab75696cfd03%3A0xb27c20e0feb23843!2zTm93aGVyZSDnhKHmiYA!5e0!3m2!1szh-TW!2stw!4v1620234088028!5m2!1szh-TW!2stw"

  if(req.body.description){description=req.body.description}
  if(req.body.name_en){name_en=req.body.name_en}
  if(req.body.google_map){google_map= req.body.google_map}

  Shop.findById(id)
    .then(data => {  
      data.name=name
      data.name_en=name_en
      data.category=category
      data.image=image
      data.location=location
      data.phone=phone
      data.google_map=google_map
      data.rating=rating
      data.description=description
      data.save()
    })
    .then(() => {
      console.log("Edit success!");
      res.redirect('/')}
    )
    .catch(error => console.log(error))
})

//Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Shop.findById(id)
  .then(data => data.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

module.exports = router