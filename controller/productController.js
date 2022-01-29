const express = require('express')
const routes = express.Router()
const ecomProduct = require('../nisn/product')

// api product
routes.get('/showProduct/:id', ecomProduct.getProduct)
routes.post('/createProduct', ecomProduct.createProduct)
routes.delete('/deleteProduct/:id', ecomProduct.deleteProduct)
routes.put('/updateProduct/:id', ecomProduct.updateProduct)

module.exports = routes