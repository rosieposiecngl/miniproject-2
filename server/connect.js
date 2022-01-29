var mysql = require('mysql');


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nohackings123*",
    database: "ecommerce"
});

db.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Db Connected");
    }
})

module.exports = {
    db
}