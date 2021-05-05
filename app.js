// declaration
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 5000
const methodOverride = require('method-override')



// static folder
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

// template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

require('./config/mongoose')

const routes = require('./routes/index')
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port} with nodemon`)
})

