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
<<<<<<< Updated upstream
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
=======
        .then(async function() {
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

app.post("/insert-product_branch", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
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

app.get("/driver-view-order", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('MaTX', sql.NVarChar(10), req.session.user)
                    .execute('sp_TX_XemDH')
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.post("/dri-update-order-stat", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
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

app.post("/dri-recv-order", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
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

app.post("/find-user", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.query(`select* from TaiKhoan where NguoiDung like '%'+N'${req.body.user}'+'%'`)
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.post("/manage-user", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('TK', sql.VarChar(50), req.body.TK)
                    .execute('sp_TK_Disable_Enable_Login')
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.post("/add-emp", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('TK', sql.VarChar(50), req.body.username)
                    .input('MK', sql.VarChar(50), req.body.pass)
                    .input('TenNV', sql.NVarChar(50), req.body.name)
                    .output('MaNV', sql.Char(10))
                    .execute('sp_Insert_NhanVien')
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.post("/add-KH", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('HoTen', sql.NVarChar(50), req.body.name)
                    .input('DiaChi', sql.VarChar(100), req.body.addr)
                    .input('SDT', sql.Char(10), req.body.phone)
                    .input('Email', sql.VarChar(50), req.body.email)
                    .input('TK', sql.VarChar(50), req.body.username)
                    .input('MK', sql.VarChar(50), req.body.pass)
                    .output('MaKH', sql.VarChar(10))
                    .execute('sp_Insert_KhackHang')
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})



app.post("/add-TX", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('HoTen', sql.NVarChar(50), req.body.name)
                    .input('DiaChi', sql.VarChar(100), req.body.addr)
                    .input('SDT', sql.VarChar(12), req.body.phone)
                    .input('Email', sql.VarChar(50), req.body.email)
                    .input('CMND', sql.VarChar(12), req.body.cmnd)
                    .input('BienSoXe', sql.VarChar(9), req.body.bsx)
                    .input('KhuVucHD', sql.NVarChar(50), req.body.kvhd)
                    .input('TKNganHang', sql.VarChar(15), req.body.tknh)
                    .input('TK', sql.VarChar(50), req.body.username)
                    .input('MK', sql.VarChar(50), req.body.pass)
                    .output('MaTX', sql.VarChar(10))
                    .execute('sp_Insert_TaiXe')
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.post("/add-DT", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('TenDT', sql.NVarChar(50), req.body.name)
                    .input('NguoiDD', sql.NVarChar(50), req.body.namedd)

                .input('TP', sql.NVarChar(50), req.body.tp)
                    .input('Quan', sql.NVarChar(50), req.body.quan)
                    .input('SoLuongDon', sql.Int, req.body.sld)
                    .input('LoaiHangVC', sql.NVarChar(50), req.body.lhvc)
                    .input('DiaChi', sql.NVarChar(50), req.body.addr)
                    .input('SDT', sql.VarChar(10), req.body.phone)
                    .input('Email', sql.VarChar(50), req.body.email)
                    .input('TK', sql.VarChar(50), req.body.username)
                    .input('MK', sql.VarChar(50), req.body.pass)

                .output('MaDT', sql.VarChar(10))
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

app.get("/find-notconfirm-contract", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.query(`select hd.*, dt.TenDT from HopDong hd join DoiTac dt on hd.MaDT = dt.MaDT where hd.MaNV is null`)
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message;
            }
        })
})
app.get("/view-contract", function(req, res) {
    let MaNV = req.session.user; //thay bang sesstion
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.query(`select hd.*, dt.TenDT from HopDong hd join DoiTac dt on hd.MaDT = dt.MaDT where hd.MaNV ='${MaNV}'`)
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message;
            }
        })
})
app.post("/confirm-contract", function(req, res) {
    let MaNV = req.session.user; //thay bang sesstion
    //console.log(req.body);
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.query(`update HopDong set MaNV = '${MaNV}', ThoiHan = '${req.body.ThoiHan}' where MaHD = '${req.body.MaHD}'`)
                pool.close()
                res.send(result.recordset)
                    //console.log(result)
                return
            } catch (error) {
                console.log(error.message);
                return error.message;
            }
        })
>>>>>>> Stashed changes
})