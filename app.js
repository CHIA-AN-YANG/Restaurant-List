// declaration
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 5000

const mongoose = require('mongoose')                       // 載入 mongoose
mongoose.connect(                                          // 設定連線到 mongoDB
	'mongodb://localhost:27017/local',
	 { useNewUrlParser: true, useUnifiedTopology: true	}
)   
const Restaurant = require('./models/restaurant')

const db = mongoose.connection
// 取得資料庫連線狀態
db.on('error', () => { console.log('mongodb error!') }) 
db.once('open', () => { console.log('mongodb connected!') })

// static folder
app.use(express.static('public'))

// template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// body parser ()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// **** router setting ****

//Homepage
app.get('/', (req, res) => {
  const noLightBox = "none"
  Restaurant.find()
  .lean()
  .then(data => res.render('index',{restaurants: data, showLightBox: noLightBox}))
  .catch(error => console.error(error))  
})

//search
app.get('/search', (req, res) => {
  const noLightBox = "none"
  const resList = []
  const resSingle = "";
  const keyword = req.query.keyword
  const resFilteredList = resList.filter(el =>{ return el.name.toLowerCase().includes(keyword.toLowerCase())})
  res.render('index',{restaurants: resFilteredList, restaurant:resSingle, showLightBox: noLightBox})
})

//Create -- render page for 'add'
app.get('/shops/add', (req, res) => {
  return res.render('add')
})
//Create -- send out added data
app.post('/shops/add', (req, res) => {
  let [name, en_name, category, image, location, phone, google_map, rating, description="NA"] 
    = [req.body.name, req.body.en_name, req.body.category, req.body.image, req.body.location, 
       req.body.phone, req.body.google_map, req.body.rating, req.body.description] 
  return Restaurant.create({ name, en_name, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Read
app.get('/shops/:id/show', (req, res) => {
  const id = req.params.id
  const showLightBox = "block";
  Restaurant.find()
  .lean()
  .then(data => {
    const resSingle = data.find(el => el._id.toString() === id.toString());
    console.log(resSingle)
    res.render('index',{restaurants: data, restaurant: resSingle, showLightBox:showLightBox}
  )})
  .catch(error => console.error(error))  
})

//Update -- render page for 'edit'
app.get('/shops/:id/edit', (req, res) => {
  const id=req.params.id;
  return Restaurant.findById(id)
  .lean()
  .then(data => {
    console.log(data)
    res.render('edit',{restaurant: data}) 
  })
  .catch(error => console.log(error))
})
//Update -- send out updated data
app.post('/shops/:id/edit', (req, res) => {
  const id = req.params.id
  let [name, en_name, category, image, location, phone, google_map, rating, description="NA"] 
    = [req.body.name, req.body.en_name, req.body.category, req.body.image, req.body.location, 
       req.body.phone, req.body.google_map, req.body.rating, req.body.description] 

  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name;
      restaurant.en_name = en_name;
      restaurant.category = category;
      restaurant.image = image;              
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save()
    })
    .then(() => {
      console.log("Edit success!");
      res.redirect('/')}
    )
    .catch(error => console.log(error))
})

//Delete
app.post('/shops/:id/delete', (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
  .then(data => data.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port} with nodemon`)
})

