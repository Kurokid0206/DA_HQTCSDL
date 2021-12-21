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
    user: 'user',
    password: '111101',
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







app.get("/driver-view-order", function(req,res){
    Promise.resolve('success')
    .then(async function () {
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

app.get("/cus-view-order", function(req,res){
    Promise.resolve('success')
    .then(async function () {
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

app.post("/insert-order", function(req,res){
    Promise.resolve('success')
    .then(async function () {
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

app.post("/insert-product", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .output('MaSP', sql.Char(10))
                .input('TenSP', sql.NVarChar(50), 'Sản Phẩm A')
                .input('GiaBan', sql.Int, '10000')
                .execute('sp_Insert_SanPham')
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

app.post("/insert-product_branch", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaSP', sql.Char(10), 'SP0000001')
                .input('MaDT', sql.Char(10), 'DT0000001')
                .input('MaCN', sql.Char(10), 'CN0000001')
                .execute('sp_Insert_SP_CN')
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

app.post("/dri-update-order-stat", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaDH', sql.Char(10), 'DH0000001')
                .input('Option', sql.Int, 1)
                .execute('sp_Update_TinhTrang')
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

app.post("/dri-recv-order", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaDH', sql.Char(10), 'DH0000001')
                .input('MaTX', sql.Char(10), 'TX0000001')
                .execute('sp_TX_NhanDH')
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

app.post("/cancel-order", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaDH', sql.Char(10), 'DH0000001')
                .execute('sp_HuyDH')
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