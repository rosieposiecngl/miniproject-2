const express = require('express')
const app = express()

app.use(express.json())

const productController = require('./controller/productController')
const accController = require('./controller/accController')

app.use('/', productController)
app.use('/', accController)

app.listen(3000, () => {
    // console.log(`Example app listening at http://localhost:${port}`)
})