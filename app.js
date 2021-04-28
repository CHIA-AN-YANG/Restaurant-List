const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const resJson = require('./restaurant.json')
const resList = resJson['results']
let showLightBox = "none"


//set path for static folder, this is also a router setting
app.use(express.static('public'))

//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//  ************************************************
//  | setting the route and corresponding response |
//  ************************************************

app.get('/', (req, res) => {
  const noLightBox = "none"
  res.render('index',{restaurants: resList, showLightBox: noLightBox})
})

app.get('/map/:id', (req, res) => {
  showLightBox = "block"
  const resSingle = resList.find(el => el.id.toString() === req.params.id)
  res.render('index',{restaurants: resList, restaurant:resSingle, showLightBox:showLightBox})
})

app.get('/search', (req, res) => {
  const noLightBox = "none"
  const resSingle = "";
  const keyword = req.query.keyword
  const resFilteredList = resList.filter(el =>{ return el.name.toLowerCase().includes(keyword.toLowerCase())})
  res.render('index',{restaurants: resFilteredList, restaurant:resSingle, showLightBox: noLightBox})
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port} with nodemon`)
})

