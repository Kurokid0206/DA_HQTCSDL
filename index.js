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
    password: '123456789',
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

//Insert-customer feature
app.post("/insert-customer", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaKH', sql.VarChar(10), 'KH00000005')
                .input('HoTen', sql.NVarChar(50), 'Nguyễn Văn A')
                .input('SDT', sql.VarChar(12), '0123456789')
                .input('DiaChi', sql.NVarChar(100), 'Đường Bất Kì, Quận Nào Đó, Tỉnh Này Nọ')
                .input('Email', sql.VarChar(50), 'aloemyeu0502@gmail.com')
                .execute('sp_Insert_KhackHang')
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

//Insert-staff feature
app.post("/insert-staff", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaNV', sql.VarChar(10), 'NV00000005')
                .input('TenNV', sql.NVarChar(50), 'Nguyễn Văn Hảo Hán')
                .execute('sp_Insert_NhanVien')
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

//Insert-driver feature
app.post("/insert-driver", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaTX', sql.VarChar(10), 'TX00000005')
                .input('HoTen', sl.NVarChar(50), 'Nguyễn Tài Linh')
                .input('CMND', sql.VarChar(15), '080187568974')
                .input('SDT', sql.VarChar(12), '0975888643')
                .input('DiaChi', sql.NVarChar(100), 'Phố Chăm Học, Phường Siêng Năng, Tỉnh Chuyên Cần')
                .input('BienSoXe', sql.VarChar(50), '37N472.68')
                .input('KhuVucHD', sql.NVarChar(50), 'TP Thủ Đức')
                .input('Email', sql.VarChar(50), 'email15463@gmail.com')
                .input('TKNganHang', sql.VarChar(50), '6580972486321195')
                .execute('sp_Insert_TaiXe')
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

//Insert-partner feature
app.post("/insert-partner", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaDT', sql.VarChar(10), 'DT00000005')
                .input('TenDT', sql.NVarChar(50), 'Công Ty TNHH Dầu Ăn')
                .input('NguoiDD', sql.NVarChar(50), 'Nguyễn Văn B')
                .input('TP', sql.NVarChar(50), 'TP Hồ Chí Minh')
                .input('Quan', sql.NVarChar(50), 'Quận 12')
                .input('SoLuongDon', sql.Int, 150)
                .input('LoaiHangVC', sql.VarChar(50), 'Dầu ăn')
                .input('DiaChi', sql.NVarChar(50), 'Phường 6, Quận 12, TP.HCM')
                .input('SDT', sql.VarChar(12), '0555683472')
                .input('Email', sql.VarChar(50), 'dauan_corp@gmail.com')
                .execute('sp_Insert_DoiTac')
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

//Insert-branch feature
app.post("/insert-branch", function(req,res){
    Promise.resolve('success')
    .then(async function () {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaCN', sql.VarChar(10), 'CN00000001')
                .input('MaDT', sql.VarChar(10), 'DT00000005')
                .input('TenCN', sql.NVarChar(50), 'Chi Nhánh Số 1')
                .input('DiaChi', sql.NVarChar(50), 'Phường Linh Trung, TP Thủ Đức, TP.HCM')
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