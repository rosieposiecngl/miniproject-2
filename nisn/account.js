const { db } = require('../server/connect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getAccountWithToken(req, res) {


    jwt.verify(req.token, 'SECRET', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {

            var sql = "SELECT id,password,name,address,join_date,phone_number FROM merchant WHERE ?"
            var get = {
                id: authData.id
            }

            var result = db.query(sql, get, function(err, userDetail) {
                if (err) {
                    throw err
                } else {
                    res.send({
                        userDetail
                    })
                }
            })


        }
    })


}

async function getAllListAccout(req, res) {

    var sql = "SELECT id,name FROM merchant"

    var result = db.query(sql, function(err, show) {
        if (err) {
            throw err
        } else {
            res.send(show)
        }
    })

}

async function createAccount(req, res) {

    var { id, password, name, address, phone_number } = req.body

    try {
        const passwordSaya = await bcrypt.hash(password, 10)
        var sql = "INSERT INTO merchant SET ?";

        let post = {
            id: id,
            password: passwordSaya,
            name: name,
            address: address,
            phone_number: phone_number
        }

        var result = await db.query(sql, post, function(err, show) {
            if (err) {
                res.send("Coba lagi")
                throw err;
            } else {
                res.send("Data created")
            }
        })
        return result
    } catch {
        res.status(500).send("Error ")
    }
}

async function deleteAccount(req, res) {

    const { id } = req.params;
    var sql = "DELETE FROM merchant WHERE ?";
    let getDelete = {
        id: id
    }
    var result = await db.query(sql, getDelete, function(err, show) {
        if (err) {
            res.send("Data yang mau dihapus, tidak sesuai")
            throw err;
        } else {
            res.send("Data telah berhasil dihapus")
        }
    })
    return result
}

async function loginAccount(req, res) {

    const { id, password } = req.body

    var sql = "SELECT * FROM merchant WHERE ?"
    let get = {
        id: id
    }

    var result = await db.query(sql, get, function(err, show) {
        if (err) {
            res.send("Data yang mau ditunjukkan, tidak sesuai")
            throw err;
        } else {
            var string = JSON.stringify(show)
            var string2 = JSON.parse(string)

            if (id == null || password == null) {
                res.status(400).send('ID/PASS tidak lengkap')
            }

            try {
                if (id == string2[0].id && bcrypt.compareSync(password, string2[0].password)) {
                    jwt.sign({ id: id }, 'SECRET', { expiresIn: '50s' }, (err, token) => {
                            res.send({
                                token
                            })
                        })
                        // res.send('login success, silakan login dengan token untuk melihat data')
                } else {
                    res.send('Tidak diijinkan karna pass salah')
                }
            } catch {
                res.status(500).send("Data tidak ada")
            }
        }
    })

}

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== undefined) {

        const bearer = bearerHeader.split(' ')

        const bearerToken = bearer[1]

        req.token = bearerToken

        next()
    } else {
        res.send.status(403, "You do not have rights to visit this page")
    }


}




module.exports = {
    getAllListAccout,
    createAccount,
    deleteAccount,
    getAccountWithToken,
    loginAccount,
    verifyToken
}