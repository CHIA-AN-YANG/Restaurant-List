// declaration
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const resJson = require('./restaurant.json')
const port = 5000

const mongoose = require('mongoose')                       // 載入 mongoose
mongoose.connect(                                          // 設定連線到 mongoDB
	'mongodb://localhost:27017/local',
	 {                                                       //configure parser & engine
		useNewUrlParser: true, 
		useUnifiedTopology: true
		}
)   
const Restaurant = require('./models/restaurant')

const db = mongoose.connection
// 取得資料庫連線狀態
db.on('error', () => { console.log('mongodb error!') }) 
db.once('open', () => { console.log('mongodb connected!') })



// static folder
app.use(express.static('public'))

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'handlebars')

// body parser ()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router

app.get('/', (req, res) => {
  const noLightBox = "none"
  res.render('index',{restaurants: resList, showLightBox: noLightBox})
})

app.get('/shops/:id', (req, res) => {
  const resList = resJson['results'];
  const showLightBox = "block";
  const resSingle = resList.find(el => el.id.toString() === req.params.id);
  res.render('index',{restaurants: resList, restaurant:resSingle, showLightBox:showLightBox});
})

app.get('/search', (req, res) => {
  const noLightBox = "none"
  const resList = resJson['results']
  const resSingle = "";
  const keyword = req.query.keyword
  const resFilteredList = resList.filter(el =>{ return el.name.toLowerCase().includes(keyword.toLowerCase())})
  res.render('index',{restaurants: resFilteredList, restaurant:resSingle, showLightBox: noLightBox})
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port} with nodemon`)
})

