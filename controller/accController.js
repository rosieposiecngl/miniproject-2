const express = require('express')
const routes = express.Router()
const ecomAcc = require('../nisn/account')

// api account
routes.post('/getAccount', ecomAcc.verifyToken, ecomAcc.getAccountWithToken) //login dengan token
routes.get('/getAllAcount', ecomAcc.getAllListAccout) //mendapatkan semua list akun di merchant
routes.post('/createAccount', ecomAcc.createAccount) //membuat akun
routes.delete('/deleteAccount/:id', ecomAcc.deleteAccount) //menghapus akun
routes.post('/loginAccount', ecomAcc.loginAccount) //login dengan akun untuk mendapatkan token

module.exports = routes