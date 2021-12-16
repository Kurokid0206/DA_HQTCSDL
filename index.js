// use node express
const express = require("express");
const app = express();
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

//app.set("view engine","ejs");

const sql = require('mssql');
//const { config } = require("nodemon");


app.listen(3000, function(){
	console.log("server is listen on port 3000.");
});