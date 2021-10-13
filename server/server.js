const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs') //gives you access to the file system
require('dotenv').config()

//import routes
// const authRoutes = require('./routes/auth')

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, //default true, so maybe change this so the frontend will send the info to the backend
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED')) 
.catch(err => console.log(`DB CONNNECTION ERR ${err}`))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({limit: "2mb"})) //limit how much data is passed by the client
app.use(cors())

//routes middleware
//app.use('/api', authRoutes)
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))


//port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`))

mongoose.set('useFindAndModify', false);