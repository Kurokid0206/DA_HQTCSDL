// use node express
const express = require("express");
const app = express();
const path = require("path")


//set stactic folder
app.use(express.static('./publics/'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
    // parse application/json
app.use(express.json())

//app.set("view engine","ejs");

const sql = require('mssql');
//const { config } = require("nodemon");


app.listen(3000, function() {
    console.log("server is listen on port 3000.");
});

//config mssql
config = {
    user: 'sa',
    password: '.',
    server: 'localhost',
    database: 'qlGH',
    port: 1433,
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

//API

//home page
app.get("/", function(req, res) {

        res.sendFile(__dirname + "/html/index.html")
    })
    //customer page
app.get("/customer", function(req, res) {

        res.sendFile(__dirname + "/html/index.html")
    })
    //supplier page
app.get("/supplier", function(req, res) {

        res.sendFile(__dirname + "/html/index.html")
    })
    //driver page
app.get("/driver", function(req, res) {

        res.sendFile(__dirname + "/html/index.html")
    })
    //employee page
app.get("/employee", function(req, res) {

        res.sendFile(__dirname + "/html/index.html")
    })
    //admin page
app.get("/admin", function(req, res) {

    res.sendFile(__dirname + "/html/index.html")
})