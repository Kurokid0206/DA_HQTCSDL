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
app.get("/registration", function(req, res) {

        res.sendFile(__dirname + "/html/registration.html")
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







app.get("/driver-view-order", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('MaTX', sql.NVarChar(10), 'TX001')
                    .execute('sp_TX_XemDH')
                pool.close()
                res.send(result.recordset)
                console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.get("/cus-view-order", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('MaKH', sql.NVarChar(10), 'KH001')
                    .execute('sp_KH_XemDH')
                pool.close()
                res.send(result.recordset)
                console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.post("/insert-order", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('HTThanhToan', sql.NVarChar(10), 'Tiền')
                    .input('DiaChiGiaoHang', sql.NVarChar(10), 'HCM')
                    .input('MaKH', sql.NVarChar(10), 'KH001')
                    .input('MaDT', sql.NVarChar(10), 'DT001')
                    .execute('sp_Insert_DonHang')
                pool.close()
                res.send(result.recordset)
                console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})