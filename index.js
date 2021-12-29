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

app.use(session({
        secret: "SquadC4",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 600000
        }
    }))
    //app.set("view engine","ejs");

const sql = require('mssql');
const { json, redirect } = require("express/lib/response");
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
    //console.log(req.session.user)
    if (req.session.user) {
        //console.log(req.session.user)
        let type = req.session.user
        if (type.indexOf("KH") > -1) {
            res.sendFile(__dirname + "/html/customer.html")
        } else if (type.indexOf("TX") > -1) {
            //res.redirect("/driver")
            res.sendFile(__dirname + "/html/driver.html")
        } else if (type.indexOf("DT") > -1) {
            //res.redirect("/supplier")
            res.sendFile(__dirname + "/html/supplier.html")
        } else if (type.indexOf("NV") > -1) {
            //res.redirect("/employee")
            res.sendFile(__dirname + "/html/employee.html")
        } else if (type.indexOf("QTV") > -1) {
            //res.redirect("/admin")
            res.sendFile(__dirname + "/html/admin.html")
        } else {
            res.sendFile(__dirname + "/html/index.html")
        }
    } else { res.sendFile(__dirname + "/html/index.html") }
})

// //customer page
// app.get("/customer", function(req, res) {
//         res.sendFile(__dirname + "/html/customer.html")
// })
// //supplier page
// app.get("/supplier", function(req, res) {
//         res.sendFile(__dirname + "/html/supplier.html")
//     })
//     //driver page
// app.get("/driver", function(req, res) {
//         res.sendFile(__dirname + "/html/driver.html")
//     })
//     //employee page
// app.get("/employee", function(req, res) {

//         res.sendFile(__dirname + "/html/employee.html")
//     })
//     //admin page
// app.get("/admin", function(req, res) {
//     //console.log(req.session)
//     res.sendFile(__dirname + "/html/admin.html")

// })

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
                    .input('tk', sql.VARCHAR(50), `${req.body.username}`)
                    .input('mk', sql.VarChar(20), `${req.body.password}`)
                    .output('ma', sql.Char(10))
                    .execute('sp_TK_Login')
                pool.close()
                    //console.log(result)
                req.session.user = result.output.ma
                res.redirect("/")
                    //console.log(result.output.ma)
                    //console.log(req.session.user)
                    // let type = JSON.stringify(result.output)
                    // if (type.indexOf("KH") > -1) {
                    //     res.redirect("/customer")
                    // } else if (type.indexOf("TX") > -1) {
                    //     res.redirect("/driver")
                    // } else if (type.indexOf("DT") > -1) {
                    //     res.redirect("/supplier")
                    // } else if (type.indexOf("NV") > -1) {
                    //     res.redirect("/employee")
                    // } else if (type.indexOf("QTV") > -1){
                    //     res.redirect("/admin")
                    // } else{
                    //     res.redirect("/")
                    // }
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.get("/log-out", function(req, res) {
    req.session.destroy();
    //console.log(req.session)
    res.redirect("/")
})

app.post("/insert-order", function(req, res) {
    //console.log(req.session.user)
    var data = JSON.parse(req.body.data)
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                const transaction = new sql.Transaction(pool)
                transaction.begin(err => {
                    // ... error checks

                    let request = new sql.Request(transaction)
                    request.input('HTThanhToan', sql.NVarChar(50), req.body.Httt)
                        .input('DiaChiGiaoHang', sql.NVarChar(50), req.body.DiaChi)
                        .input('MaKH', sql.NVarChar(10), req.session.user)
                        .input('MaDT', sql.NVarChar(10), req.body.MaDT)
                        .output('MaDH', sql.Char(10))
                        .execute('sp_Insert_DonHang', (err, result) => {
                            if (err) {
                                transaction.rollback(err => {
                                    // ... error checks

                                    //console.log("Transaction rollback")
                                })
                                return
                            } else {

                                function add_detail(elements, i) {
                                    if (i >= elements.length) {
                                        transaction.commit(err => {
                                            // ... error checks

                                            //console.log("Transaction commit ket thuc de quy.")

                                        })
                                        return
                                    }
                                    let element = elements[i];
                                    // console.log(element.MaSP)
                                    // console.log(element.SoLuong)
                                    let request = new sql.Request(transaction)
                                    request.input('MaDH', sql.VarChar(10), result.output.MaDH)
                                        .input('MaSP', sql.VarChar(10), element.MaSP)
                                        .input('SoLuong', sql.Int, element.SoLuong)
                                        .execute('sp_Insert_CT_DonHang', (err, result) => {
                                            // ... error checks
                                            if (err) {
                                                transaction.rollback(err => {
                                                        // ... error checks


                                                        //console.log("Transaction rollback trong de quy.")
                                                        //console.log(element.MaSP)
                                                    })
                                                    //console.log(err)
                                                return
                                            } else {

                                                return add_detail(data, i + 1);
                                            }

                                        })

                                }
                                add_detail(data, 0);
                            }
                            // ... error checks

                        })

                })
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

// async function insert_order_detail(data) {
//     try {
//         let pool = await sql.connect(config);
//         let result = await pool.request()
//             .input('MaDH', sql.VARCHAR(10), data.MaDH)
//             .input('MaSP', sql.VARCHAR(10), data.MaSP)
//             .input('SoLuong', sql.Int, data.SoLuong)
//             .execute('sp_Insert_CT_DonHang')
//         pool.close()
//         res.send(result.recordset)
//             //console.log(result)
//         return
//     } catch (error) {
//         console.log(error.message);
//         return error.message
//     }
// }

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
    //console.log(req.body.MaDH)
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
                let result = await pool.query(`select* from doitac`)
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

app.post("/insert-product-branch", function(req, res) {})

app.get("/get-branches", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool
                    .query(`SELECT * FROM CHINHANH WHERE MADT='${req.session.user}'`)
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
                //console.log(result)
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
                //console.log(result)
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
    console.log(req.body)
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('MaDH', sql.Char(10), req.body.MaDH)
                    .input('Option', sql.Int, req.body.opt)
                    .execute('sp_TX_Update_TinhTrang')
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

app.post("/dri-recv-order", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('MaDH', sql.Char(10), req.body.MaDH)
                    .input('MaTX', sql.Char(10), req.session.user)
                    .execute('sp_TX_NhanDH')
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
app.get("/dri-my-order", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.query(
                    `select MaDH, HoTen,  TongTien,HTThanhToan, DiaChiGiaoHang 
                        from DonHang DH join KhachHang KH on DH.MaKH = KH.MaKH
                        where DH.MaTX='${req.session.user}' AND DH.TinhTrang != N'Đã Giao'`)
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
                    .input('DiaChi', sql.NVarChar(100), req.body.addr)
                    .input('SDT', sql.Char(10), req.body.phone)
                    .input('Email', sql.VarChar(50), req.body.email)
                    .input('TK', sql.VarChar(50), req.body.username)
                    .input('MK', sql.VarChar(20), req.body.pass)
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
                    //console.log(result)
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
})


app.get("/dri_income", function(req, res) {
    let MaNV = req.session.user; //thay bang sesstion
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool
                    .query(`select *from DonHang where MaTX ='${req.session.user}' and TinhTrang=N'Đã Giao'`)
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

app.get("/supp-get-orders", function(req, res) {

    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool
                    .query(`select *from DonHang where MaDT ='${req.session.user}'`)
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
app.post("/supp-get-products", function(req, res) {

    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool
                    .query(`select sp.*, ct.SLTon from SanPhamChiNhanh ct join SanPham sp on ct.MaSP = sp.MaSP  where MaDT ='${req.session.user}' and MaCN = '${req.body.MaCN}'`)
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
app.get("/supp-get-products", function(req, res) {

    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool
                    .query(`select *from SanPham sp`)
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
app.post("/supp-delete-products-frombranchs", function(req, res) {

    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool
                    .query(`delete  from SanPhamChiNhanh  where MaDT ='${req.session.user}' and MaCN = '${req.body.MaCN}' and MaSP = '${req.body.MaSP}'`)
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
app.post("/supp-add-old-product", function(req, res) {

    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool
                    .query(`insert into SanPhamChiNhanh(MaDT,MaCN,MaSP,SLTon) 
                    values('${req.session.user}','${req.body.MaCN}','${req.body.MaSP}','${req.body.SLTon}')`)
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


app.post("/add-new-product-to-branch", function(req, res) {
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('TenSP', sql.NVarChar(50), req.body.TenSP)
                    .input('GiaBan', sql.Int, parseInt(req.body.GiaBan))

                .output('MaSP', sql.Char(10))
                    .execute('sp_Insert_SanPham')
                pool.close()
                    //console.log(result.output.MaSP)
                return result.output.MaSP

            } catch (error) {
                console.log(error.message);
                return error.message
            }
        }).then(async function(MaSP) {
            try {
                let pool2 = await sql.connect(config);
                let result2 = await pool2.request()
                    .input('MaSP', sql.Char(10), MaSP)
                    .input('MaDT', sql.Char(10), req.session.user)
                    .input('MaCN', sql.Char(10), req.body.MaCN)
                    .input('SLTon', sql.Int, parseInt(req.body.SLTon))


                .execute('sp_Insert_SP_CN')
                pool2.close()
                res.send(result2.recordset)

            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})