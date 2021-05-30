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
    usernameField: 'user_email', //設定別名
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ 'user_email': email })  //傳進來的變數
      .then(user => {
        if (!user) {
          console.log(email, 'email not registered')
          // return done(null, false, {message:'email not registered'})
          return done(null, false)
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            console.log(email, 'email or pass not correct')
            // return done(null, false, {message:'email or pass not correct'})
            return done(null, false)
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json
    User.findOne({ email })
    .then(user => {
      if(user){return done(null, user)}
      const password = Math.random().toString(36).slice(-8)
      return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        user_name: name,
        user_email: email,
        password: hash
    }))
    .then(user => done(null, user))
    .catch(err => done(err, false))
  })}))

    // 設定序列化與反序列化
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser((id, done) => {
      User.findById(id)
        .lean()
        .then(user => done(null, user))
        .catch(err => done(err, null))
    })
}

