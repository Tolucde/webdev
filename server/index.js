const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Controllers
const userController = require('./controllers/userController')
const itemController = require('./controllers/itemController')
const cartController = require('./controllers/cartController')
const orderController = require('./controllers/orderController')

// Initialize the app
const app = express()
const PORT = 4000

app.use(cors())
app.options('*', cors())
app.use(express.json())
    // Middleware for parsing JSON bodies
app.use(bodyParser.json())

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/optimstore', {})
    .then(() => {
        console.log('Connected to MongoDB...')
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err)
    })

// Routes
app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.get('/items', itemController.showItems)
app.get('/item/:id', itemController.showItem)
app.post('/cart', cartController.addToCart)
app.post('/removeFromCart', cartController.removeFromCart)
app.patch('/cart/decreaseQuantity', cartController.decreaseQuantity)
app.patch('/cart/increaseQuantity', cartController.increaseQuantity)
app.post('/clearCart', cartController.clearCart)

app.get('/cart/:userId', cartController.showCart)
app.post('/order', orderController.addOrder)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port${PORT}`)
})