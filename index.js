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

app.get("/registration", function(req, res) {
    res.sendFile(__dirname + "/html/registration.html")
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

async function insert_order_detail(data){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('MaDH', sql.VARCHAR(10), data.MaDH)
            .input('MaSP', sql.VARCHAR(10), data.MaSP)
            .input('SoLuong', sql.Int, data.SoLuong)
            .execute('sp_Insert_CT_DonHang')
        pool.close()
        //res.send(result.recordset)
        console.log(result)
        return 
    } catch (error) {
        console.log(error.message);
        return error.message
    }
}
app.post("/insert-contract",function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaSoThueDT', sql.VARCHAR(50), '012345')
                .input('NguoiDaiDien', sql.NVarChar(50), 'Trần Minh Sơn')
                .input('SoChiNhanhDK', sql.Int, '1')
                .input('MaDT', sql.NVarChar(10), 'DT001')
                .input('ThoiHan', sql.Date, '2021-12-21')
                .execute('sp_Insert_HopDong')
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

async function insert_contract_detail(data){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('MaHD', sql.VARCHAR(10), data.MaHD)
            .input('MaDT', sql.VARCHAR(10), data.MaDT)
            .input('MaCN', sql.VARCHAR(10), data.MaCN)
            .execute('sp_Insert_CT_HopDong')
        pool.close()
        //res.send(result.recordset)
        console.log(result)
        return 
    } catch (error) {
        console.log(error.message);
        return error.message
    }
}

app.post("/insert-product",function(req,res){


})

app.post("/insert-product-branch",function(req,res){

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


app.post("/driver-get-order",function(req,res){



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
app.get("/cus-view-order-detail", function(req,res){
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


app.post("/customer-cancel-order",function(req,res){



})


app.post("/log-in",function(req,res){
    //console.log(req.body)
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('tk', sql.VARCHAR(10), `${req.body.username}`)
                .input('mk', sql.VarChar(10), `${req.body.password}`)
                .output('matk', sql.VarChar(10))
                .execute('sp_login')
            pool.close()
            res.redirect("/")
            //res.send(result)
            console.log(result)
            return 
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    })

})