const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


//register
router.get('/register', (req, res) => {
  return res.render('register')
})
router.post('/register', (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  console.log('errors array: ', errors)
  if (errors.length) {
    return res.render('register', {
      errors,
      user_name: name,
      user_email: email,
      password,
      confirmPassword
    })
  }
  //check if user exists
  User.findOne({user_email: email}).then(user => { 
    if(user){ errors.push({message:'user already exists, please log in.'}) }
    if(password!==confirmPassword){ errors.push({message:'user already exists, please log in.'}) }
    if(errors.length >0){ 
      return res.render('register', {errors, name, email, password, confirmPassword}) }

  return bcrypt
  .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
  .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
  .then(hash => User.create({
    user_name: name,
    user_email: email,
    password: hash // 用雜湊值取代原本的使用者密碼
  }))
  .then(() => {
    req.flash('success_msg', '註冊成功！請登入以使用本服務。')
    res.redirect('/users/login')
  })
  .catch(err => console.log(err))
}
)})



//login
router.get('/login', (req, res) => {
  return res.render('login')
})
// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  // failureFlash: true
}))

//log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})

module.exports = router