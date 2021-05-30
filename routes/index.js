const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth.js')
//提供網頁訊息的 middleware
router.use(function(req, res, next) {
  console.log(`method: ${req.method}, router: ${req.url}`)
  next()
})

const auth = require('./modules/auth')
const users = require('./modules/users')
const home = require('./modules/home')
const shops = require('./modules/shops')



router.use('/auth', auth)
router.use('/users', users)
router.use('/', authenticator, home)
router.use('/shops', authenticator, shops)

module.exports = router