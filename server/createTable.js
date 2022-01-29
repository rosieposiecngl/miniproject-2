var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nohackings123*",
    database: "ecommerce"
});

db.connect(function(err) {
    // db.query("use ecommerce");
    // Make table in database
    var merchant = "CREATE TABLE merchant (id INT PRIMARY KEY,password VARCHAR (255),name VARCHAR(255), address VARCHAR(255),join_date DATETIME DEFAULT NOW(), phone_number VARCHAR(50) )";
    db.query(merchant, function(err, result) {
        if (err) throw err;
        console.log("Table merchant created");
    });

    // var products = "CREATE TABLE products (id INT PRIMARY KEY,name VARCHAR(255),quantity INT(100), price INT(25) )";
    // db.query(products, function(err, result) {
    //     if (err) throw err;
    //     console.log("Table products created");
    // });

});