// init express
const express = require('express')
const app = express()

//init body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//alow Cross origin requests
const cors = require('cors')
app.use(cors())

// db ENV params
require('dotenv').config()

//mongo connect
const mongoose = require('mongoose');
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eznnv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('connection to db successfull'))

//route 
const shoppingListRoute = require('./routes/api/shoppingList')
app.use('/api/shopping', shoppingListRoute)

// start express server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running at port ${PORT}`))
