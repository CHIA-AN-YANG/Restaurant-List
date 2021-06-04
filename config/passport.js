const User = require('../models/user')
const passport = require('passport')
const flash = require('connect-flash')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ 
    usernameField: "email", //Form傳進來的變數如果不是預設的name，就設定別名
    passReqToCallback: true
  }, (req, email, password, done) => { //傳進來的變數
    User.findOne({ user_email: email }) 
      .then(user => {
        if (!user) {
          console.log('email does not exist') 
          return done(null, false, req.flash('warning_msg',"Email還沒有註冊喔，請先註冊。"))
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash("warning_msg", 'Email或密碼錯誤。'))
          }else{
            return done(null, user, req.flash("success_msg", '已成功登入。'))
          }
        })
      })
      .catch(err => done(err, false))
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK, //FB dev => Setting => FB login => 有效的重新導向URI
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => { 
    const { email, name } = profile._json
    User.findOne({ user_email: email })
    .then(user => {
      if(user){
        console.log('user already exists, logging you in...')
        return done(null, user)
      }else{
      const password = Math.random().toString(36).slice(-8)
      return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        user_name: name,
        user_email: email,
        password: hash
      }))}
    })
    .then(user => done(null, user))
    .catch(err => done(err, false))
  }))

   
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser((id, done) => {
      User.findById(id)
        .lean()
        .then(user => done(null, user))
        .catch(err => done(err, null))
    })
}

