const express = require('express')
const router = express.Router()

//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

//controller
const {create, list} = require('../controllers/product')

//routes
router.post('/product', authCheck, adminCheck, create)
// changing router.get('/products', read) to router.get('/products', list)


router.get('/products', list)


module.exports = router