// use node express
const express = require("express");
const session = require("express-session")
const app = express();
const path = require("path")

//set stactic folder
app.use(express.static('./publics/'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
    // parse application/json
app.use(express.json())

app.use(session({ secret: "SquadC4", resave: false, saveUninitialized: true }))
//app.set("view engine","ejs");

const sql = require('mssql');
const { json } = require("express/lib/response");
//const { config } = require("nodemon");

app.use((req, res, next) => {
    res.locals.user = req.session.user
    next()
})


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
    res.sendFile(__dirname + "/html/customer.html")
})
//supplier page
app.get("/supplier", function(req, res) {
    res.sendFile(__dirname + "/html/supplier.html")
})
//driver page
app.get("/driver", function(req, res) {
    res.sendFile(__dirname + "/html/driver.html")
})
//employee page
app.get("/employee", function(req, res) {

        res.sendFile(__dirname + "/html/employee.html")
})
//admin page
app.get("/admin", function(req, res) {
    res.sendFile(__dirname + "/html/admin.html")
})

app.get("/registration", function(req, res) {
    res.sendFile(__dirname + "/html/registration.html")
})

app.post("/log-in", function(req, res) {
    //console.log(req.body)
    Promise.resolve('success')
    .then(async function() {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('tk', sql.VARCHAR(10), `${req.body.username}`)
                .input('mk', sql.VarChar(10), `${req.body.password}`)
                .output('ma', sql.Char(10))
                .execute('sp_TK_Login')
            pool.close()
            
            req.session.user=result.output.ma
            //console.log(result.output.ma)
            //console.log(req.session.user)
            let type = JSON.stringify(result.output)
            if (type.indexOf("KH") > -1) {

                res.redirect("/customer")
            } else if (type.indexOf("TX") > -1) {

                res.redirect("/driver")
            } else if (type.indexOf("DT") > -1) {
                res.redirect("/supplier")
            } 
            else if (type.indexOf("QTV") > -1) {
                res.redirect("/employee")
            }
            else{
                res.redirect("/admin")
            }

            return
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    })
})

app.get("/log-out",function(req,res){
	req.session.destroy();
	res.redirect("/")
})

app.post("/insert-order", function(req, res) {
    //console.log(req.session.user)
    Promise.resolve('success')
    .then(async function() {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('HTThanhToan', sql.NVarChar(50), req.body.Httt)
                .input('DiaChiGiaoHang', sql.NVarChar(50), req.body.DiaChi)
                .input('MaKH', sql.NVarChar(10), req.session.user)
                .input('MaDT', sql.NVarChar(10), req.body.MaDT)
                .output('MaDH',sql.Char(10))
                .execute('sp_Insert_DonHang')
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

async function insert_order_detail(data) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('MaDH', sql.VARCHAR(10), data.MaDH)
            .input('MaSP', sql.VARCHAR(10), data.MaSP)
            .input('SoLuong', sql.Int, data.SoLuong)
            .execute('sp_Insert_CT_DonHang')
        pool.close()
        res.send(result.recordset)
            //console.log(result)
        return
    } catch (error) {
        console.log(error.message);
        return error.message
    }
}

app.get("/cus-view-order", function(req, res) {
    Promise.resolve('success')
    .then(async function() {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaKH', sql.NVarChar(10), req.session.user)
                .execute('sp_KH_XemDH')
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

app.post("/cus-view-order-detail", function(req, res) {
    console.log(req.body.MaDH)
    Promise.resolve('success')
    .then(async function() {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaDH', sql.NVarChar(10), req.body.MaDH)
                .execute('sp_KH_XemCTDH')
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

app.post("/cancel-order", function(req, res) {
    Promise.resolve('success')
    .then(async function() {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaDH', sql.VarChar(10), req.body.MaDH)
                .execute('sp_KH_HuyDH')
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

app.get("/supplier-data", function(req, res) {
    Promise.resolve('success')
    .then(async function() {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('sp_get_DT')
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

app.post("/product-data", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input("MaDT", sql.VarChar(10), req.body.MaDT)
                    .execute('sp_KH_XemSP')
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

app.post("/insert-contract", function(req, res) {
    Promise.resolve('success')
    .then(async function() {
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
                //console.log(result)
            return
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    })
})

async function insert_contract_detail(data) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('MaHD', sql.VARCHAR(10), data.MaHD)
            .input('MaDT', sql.VARCHAR(10), data.MaDT)
            .input('MaCN', sql.VARCHAR(10), data.MaCN)
            .execute('sp_Insert_CT_HopDong')
        pool.close()
            //res.send(result.recordset)
            //console.log(result)
        return
    } catch (error) {
        console.log(error.message);
        return error.message
    }
}

app.post("/insert-product", function(req, res) {


})

app.post("/insert-product-branch", function(req, res) {
})

app.get("/get-branches",function(req,res){
    Promise.resolve('success')
    .then(async function(){
        try {
            let pool = await sql.connect(config);
            let result = await pool
            .query("SELECT * FROM CHINHANH WHERE MADT='DT00000000'")
            pool.close()
            
            res.send(result.recordset)
            //console.log(result)
            return
        }catch (error) {
            console.log(error.message);
            return error.message
        }
    })
})

app.post("/insert-product", function(req, res) {
    Promise.resolve('success')
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