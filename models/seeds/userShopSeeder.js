const _ = require('lodash')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Shop = require('../shop')
const User = require('../user')
const db = require('../../config/mongoose')

//Divide shop data with required length for each user
//未來考慮寫更多user的seeder file，儘量降低耦合少使用常數
let shopRawData = require('./shopSeeder')
shopDocs = _.chunk(shopRawData, 3)

const SEED_USER = [
  {
    name: 'seedUser1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'seedUser2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  bcrypt //nested structure: 未來可改寫為函式再引用進來
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[0].password, salt))
    .then(hash => User.create({user_name: SEED_USER[0].name, user_email: SEED_USER[0].email, password: hash}))
    .then(user => { 
      const arr = shopDocs[0]
      Array.from({ length: arr.length }, (_, i)=>{arr[i].userId = user._id})
      Shop.insertMany(arr)
      console.log('first user ok!')
    }).then(() => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[1].password, salt))
        .then(hash => User.create({user_name: SEED_USER[1].name, user_email: SEED_USER[1].email, password: hash}))
        .then(user => { 
          const arr = shopDocs[1]
          Array.from({ length: arr.length }, (_, i)=>{arr[i].userId = user._id})
          return Shop.insertMany(arr)
        })
        .catch(error => console.log(error))
      })
      .then(() => {
        console.log(`finish seeding with 2nd user and 3 shop docs`)      
      })
      .catch(error => console.log(error))
})
