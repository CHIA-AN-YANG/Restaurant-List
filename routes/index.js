const express = require('express')
const router = express.Router()

//提供網頁訊息的 middleware
router.use(function(req, res, next) {
  console.log(`method: ${req.method}, router: ${req.url}`)
  next()
})

const home = require('./modules/home')
const shops = require('./modules/shops')

router.use('/', home)
router.use('/shops', shops)

module.exports = router