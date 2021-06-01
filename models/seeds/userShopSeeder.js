const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Shop = require('../shop')
const User = require('../user')
const db = require('../../config/mongoose')
const shopDocs = require('./shopSeeder')

const SEED_USER = {
  name: 'foodie',
  email: 'foodie@seeder.com',
  password: 'foodlover'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({user_name: SEED_USER.name, user_email: SEED_USER.email, password: hash}))
    .then(user => { 
      Array.from({ length: shopDocs.length }, (_, i)=>{shopDocs[i].userId = user._id})
      return Shop.insertMany(shopDocs)
    })
    .then(() => {
      console.log(`finish seeding with 1 user and ${shopDocs.length} shop doc`)
      process.exit()
    })
})
