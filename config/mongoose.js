const mongoose = require('mongoose')  
mongoose.connect(                     
	'mongodb://localhost:27017/restaurant-list', //最後面是專案名稱
	 { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true	}
) 

const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') }) 
db.once('open', () => { console.log('mongodb connected!') })

module.exports = db