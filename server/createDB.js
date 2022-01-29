var mysql = require('mysql');

var testdb = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "Nohackings123*"
});

testdb.connect(function(err) {
    testdb.query(`CREATE DATABASE ecommerce`, function(err, result) {
        if (err) throw err;
        console.log(`Database e-commerce created`);
    });
})