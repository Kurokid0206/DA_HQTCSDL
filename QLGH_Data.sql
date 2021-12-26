﻿--
-- Script was generated by Devart dbForge Studio 2019 for SQL Server, Version 5.8.127.0
-- Product Home Page: http://www.devart.com/dbforge/sql/studio
-- Script date 12/25/2021 3:17:10 PM
-- Target server version: 15.00.2000
-- Target connection string: Data Source=(local);Encrypt=False;Integrated Security=True;User ID="DESKTOP-UJGB2MI\OXI PC"
--



SET LANGUAGE 'English'
SET DATEFORMAT ymd
SET ARITHABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON
SET NUMERIC_ROUNDABORT, IMPLICIT_TRANSACTIONS, XACT_ABORT OFF
GO

--
-- Backing up database QLGH
--
--
-- Create backup folder
--
IF OBJECT_ID('xp_create_subdir') IS NOT NULL
  EXEC xp_create_subdir N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\Backup'
--
-- Backup database to the file with the name: <database_name>_<yyyy>_<mm>_<dd>_<hh>_<mi>.bak
--
DECLARE @db_name SYSNAME
SET @db_name = N'QLGH'

DECLARE @filepath NVARCHAR(4000)
SET @filepath =
/*define base part*/ N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\Backup\' + @db_name + '_' +
/*append date*/ REPLACE(CONVERT(NVARCHAR(10), GETDATE(), 102), '.', '_') + '_' +
/*append time*/ REPLACE(CONVERT(NVARCHAR(5), GETDATE(), 108), ':', '_') + '.bak'

DECLARE @SQL NVARCHAR(MAX)
SET @SQL = 
    N'BACKUP DATABASE ' + QUOTENAME(@db_name) + ' TO DISK = @filepath WITH INIT' + 
      CASE WHEN EXISTS(
                SELECT value
                FROM sys.configurations
                WHERE name = 'backup compression default'
          )
        THEN ', COMPRESSION'
        ELSE ''
      END

EXEC sys.sp_executesql @SQL, N'@filepath NVARCHAR(4000)', @filepath = @filepath
GO

USE QLGH
GO

IF DB_NAME() <> N'QLGH' SET NOEXEC ON
GO

-- Delete data from the table 'dbo.SanPhamChiNhanh'
--
TRUNCATE TABLE dbo.SanPhamChiNhanh
GO
--
-- Delete data from the table 'dbo.CT_HopDong'
--
TRUNCATE TABLE dbo.CT_HopDong
GO
--
-- Delete data from the table 'dbo.CT_DonHang'
--
TRUNCATE TABLE dbo.CT_DonHang
GO
--
-- Delete data from the table 'dbo.HopDong'
--
DELETE dbo.HopDong
GO
--
-- Delete data from the table 'dbo.DonHang'
--
DELETE dbo.DonHang
GO
--
-- Delete data from the table 'dbo.ChiNhanh'
--
DELETE dbo.ChiNhanh
GO
--
-- Delete data from the table 'dbo.TaiXe'
--
DELETE dbo.TaiXe
GO
--
-- Delete data from the table 'dbo.NhanVien'
--
DELETE dbo.NhanVien
GO
--
-- Delete data from the table 'dbo.KhachHang'
--
DELETE dbo.KhachHang
GO
--
-- Delete data from the table 'dbo.DoiTac'
--
DELETE dbo.DoiTac
GO
--
-- Delete data from the table 'dbo.TaiKhoan'
--
DELETE dbo.TaiKhoan
GO
--
-- Delete data from the table 'dbo.SanPham'
--
DELETE dbo.SanPham
GO

--
-- Inserting data into table dbo.SanPham
--
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000000', N'Choco Pie Sakura', 39000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000001', N'OREO Brookie-O Brownie', 32000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000002', N'OREO Strawberry Flavor', 35000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000003', N'OREO Chocolate Hazelnut', 33000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000004', N'Choco Pie Dark', 16000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000005', N'Choco Pie Matcha', 36000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000006', N'OREO Golden Sandwich', 29000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000007', N'OREO Java Chip', 24000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000008', N'Choco Pie Cherry', 33000)
INSERT dbo.SanPham(MaSP, TenSP, GiaBan) VALUES (N'SP00000009', N'OREO Orange', 17000)
GO

--
-- Inserting data into table dbo.TaiKhoan
--
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'Kuro', '123', N'Phạm Tân Tị', N'Quản Trị Viên', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'MeanSun', '123', N'Trần Minh Sơn', N'Quản Trị Viên', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'LNTS', '1111', N'Lê Nam Thái Sơn', N'Quản Trị Viên', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'KHE', '76P31D', N'Lê Gia Hân', N'Tài Xế', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'XLF', 'IVNELE', N'Đặng Anh Minh', N'Khách Hàng', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'BAD', '0HXG93E', N'Đỗ Đức Tài', N'Nhân Viên', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'WGK', '4O2L7C', N'Đặng Khánh Ngọc', N'Nhân Viên', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'KUM', 'U8HY78J3', N'Dương Trường An', N'Đối Tác', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'XKS', '5U85EGQ', N'Dương Anh Tuấn', N'Đối Tác', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'ZCQ', 'IIUHA9', N'Phan Bảo Vy', N'Khách Hàng', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'XAH', '3Q919SUL', N'Đặng Anh Dũng', N'Đối Tác', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'WEC', '0RW566R', N'Lê Thanh Tùng', N'Đối Tác', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'PEN', '88NUX3MJ', N'Hoàng Quang Mạnh', N'Đối Tác', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'SXL', 'X6K3XUU7', N'Vũ Hoài An', N'Tài Xế', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'ELR', 'M4TE4J8', N'Phạm Hải Đăng', N'Nhân Viên', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'FKQ', '4H60L0', N'Vũ Bích Hà', N'Tài Xế', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'MUD', '9Z623JZ', N'Võ Chiến Thắng', N'Khách Hàng', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'EUR', 'M5O6277', N'Vũ Hùng Cường', N'Tài Xế', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'NJF', 'J7102D26', N'Lý Thành Công', N'Khách Hàng', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'HNB', 'M4O9716', N'Huỳnh Khả Hân', N'Nhân Viên', 'Enabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'YRF', '8ZZS6G1', N'Huỳnh Bảo Vy', N'Khách Hàng', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'PGZ', 'C5K67YH9', N'Phạm Trường An', N'Tài Xế', 'Disabled')
INSERT dbo.TaiKhoan(TaiKhoan, MatKhau, NguoiDung, VaiTro, TrangThai) VALUES (N'KLX', 'SHZX6EK', N'Lý Cẩm Anh', N'Nhân Viên', 'Enabled')
GO

--
-- Inserting data into table dbo.DoiTac
--
INSERT dbo.DoiTac(MaDT, NguoiDaiDien, ThanhPho, Quan, SoLuongDonMoiNgay, LoaiHangVanChuyen, DiaChiKinhDoanh, SoDienThoai, Email, TaiKhoan) VALUES ('DT00000000', N'Lý Minh Khôi', N'TP. Ho Chi Minh', N'Huyện Củ Chi', 90, N'Nhu Yếu Phẩm', N'72, Đường số 10, Quận 7, TP. Hồ Chí Minh', '0087410804', 'GaleL_Elliott@example.com', 'PEN')
INSERT dbo.DoiTac(MaDT, NguoiDaiDien, ThanhPho, Quan, SoLuongDonMoiNgay, LoaiHangVanChuyen, DiaChiKinhDoanh, SoDienThoai, Email, TaiKhoan) VALUES ('DT00000001', N'Trần Quang Mạnh', N'TP. Ho Chi Minh', N'Quận Tân Phú', 10, N'Thực Phẩm', N'6E, Võ Duy Ninh, Huyện Hóc Môn, TP. Hồ Chí Minh', '0151722944', 'CletusAlford929@nowhere.com', 'XAH')
INSERT dbo.DoiTac(MaDT, NguoiDaiDien, ThanhPho, Quan, SoLuongDonMoiNgay, LoaiHangVanChuyen, DiaChiKinhDoanh, SoDienThoai, Email, TaiKhoan) VALUES ('DT00000002', N'Trần Việt Dũng', N'TP. Ho Chi Minh', N'Quận 12', 20, N'Nhu Yếu Phẩm', N'7E, Đường số 14, Quận Bình Tân, TP. Hồ Chí Minh', '0500925459', 'Beatty@nowhere.com', 'KUM')
INSERT dbo.DoiTac(MaDT, NguoiDaiDien, ThanhPho, Quan, SoLuongDonMoiNgay, LoaiHangVanChuyen, DiaChiKinhDoanh, SoDienThoai, Email, TaiKhoan) VALUES ('DT00000003', N'Huỳnh Thanh Hà', N'TP. Ho Chi Minh', N'Quận 3', 120, N'Thực Phẩm', N'9D, Hồng Bàng, Thành Phố Thủ Đức, TP. Hồ Chí Minh', '0055225713', 'mftalix5377@nowhere.com', 'XKS')
INSERT dbo.DoiTac(MaDT, NguoiDaiDien, ThanhPho, Quan, SoLuongDonMoiNgay, LoaiHangVanChuyen, DiaChiKinhDoanh, SoDienThoai, Email, TaiKhoan) VALUES ('DT00000004', N'Hồ Đình Trung', N'TP. Ho Chi Minh', N'Quận 11', 160, N'Nhu Yếu Phẩm', N'44, Đường số 2, Huyện Bình Chánh, TP. Hồ Chí Minh', '0873966632', 'Marjory.Clemons391@example.com', 'WEC')
GO

--
-- Inserting data into table dbo.KhachHang
--
INSERT dbo.KhachHang(MaKH, SDT, DiaChi, Email, TaiKhoan) VALUES ('KH00000000', '0364089277', N'4A, Nguyễn Văn Lạc, Huyện Cần Giờ, TP. Hồ Chí Minh', 'ChadwickButton@example.com', 'NJF')
INSERT dbo.KhachHang(MaKH, SDT, DiaChi, Email, TaiKhoan) VALUES ('KH00000001', '0388802452', N'1D, Ung Văn Khiêm, Quận 11, TP. Hồ Chí Minh', 'LavonnaAFarrington@example.com', 'YRF')
INSERT dbo.KhachHang(MaKH, SDT, DiaChi, Email, TaiKhoan) VALUES ('KH00000002', '0649260980', N'34, Bình Lợi, Quận Gò Vấp, TP. Hồ Chí Minh', 'MaryClemmons777@example.com', 'ZCQ')
INSERT dbo.KhachHang(MaKH, SDT, DiaChi, Email, TaiKhoan) VALUES ('KH00000003', '0786417955', N'7D, Vạn Kiếp, Quận Phú Nhuận, TP. Hồ Chí Minh', 'Miranda@example.com', 'XLF')
INSERT dbo.KhachHang(MaKH, SDT, DiaChi, Email, TaiKhoan) VALUES ('KH00000004', '0689573529', N'9A, Diên Hồng, Quận Bình Thạnh, TP. Hồ Chí Minh', 'LuluAlcorn949@example.com', 'MUD')
GO

--
-- Inserting data into table dbo.NhanVien
--
INSERT dbo.NhanVien(MaNV, TaiKhoan) VALUES ('NV00000000', 'WGK')
INSERT dbo.NhanVien(MaNV, TaiKhoan) VALUES ('NV00000001', 'HNB')
INSERT dbo.NhanVien(MaNV, TaiKhoan) VALUES ('NV00000002', 'BAD')
INSERT dbo.NhanVien(MaNV, TaiKhoan) VALUES ('NV00000003', 'KLX')
INSERT dbo.NhanVien(MaNV, TaiKhoan) VALUES ('NV00000004', 'ELR')
GO

--
-- Inserting data into table dbo.TaiXe
--
INSERT dbo.TaiXe(MaTX, CMND, SDT, DiaChi, BienSoXe, KhuVucHoatDong, Email, TTNganHang, TaiKhoan) VALUES ('TX00000000', '026039189693', '0845612078', N'62, Nơ Trang Long, Huyện Củ Chi, TP. Hồ Chí Minh', '64H036.50', N'Quận 1', 'WoodrowLassiter87@example.com', '0160420051442', 'PGZ')
INSERT dbo.TaiXe(MaTX, CMND, SDT, DiaChi, BienSoXe, KhuVucHoatDong, Email, TTNganHang, TaiKhoan) VALUES ('TX00000001', '043888104339', '0965728730', N'90, Tầm Vu, Quận Gò Vấp, TP. Hồ Chí Minh', '25W555.14', N'Quận Bình Thạnh', 'AliaMoeller@example.com', '07376280713911', 'EUR')
INSERT dbo.TaiXe(MaTX, CMND, SDT, DiaChi, BienSoXe, KhuVucHoatDong, Email, TTNganHang, TaiKhoan) VALUES ('TX00000002', '014000814907', '0972533164', N'72, Võ Duy Ninh, Huyện Cần Giờ, TP. Hồ Chí Minh', '85Q410.51', N'Quận Bình Tân', 'Hank_Mcmullen@nowhere.com', '0858582839806', 'KHE')
INSERT dbo.TaiXe(MaTX, CMND, SDT, DiaChi, BienSoXe, KhuVucHoatDong, Email, TTNganHang, TaiKhoan) VALUES ('TX00000003', '025443773040', '0427387020', N'76, Nguyễn Duy, Thành Phố Thủ Đức, TP. Hồ Chí Minh', '33T542.66', N'Quận 7', 'KiethWester@nowhere.com', '06600267907375', 'SXL')
INSERT dbo.TaiXe(MaTX, CMND, SDT, DiaChi, BienSoXe, KhuVucHoatDong, Email, TTNganHang, TaiKhoan) VALUES ('TX00000004', '059607186967', '0441590938', N'5E, Đinh Bộ Lĩnh, Quận Bình Thạnh, TP. Hồ Chí Minh', '26N999.18', N'Quận 3', 'AldermanG@example.com', '0731640780249', 'FKQ')
GO

--
-- Inserting data into table dbo.ChiNhanh
--
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000005', 'DT00000004', N'Phan Văn Hân', N'1D, Hồ Xuân Hương, Huyện Hóc Môn, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000001', 'DT00000001', N'Nguyễn Duy', N'7D, Diên Hồng, Huyện Hóc Môn, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000004', 'DT00000004', N'Phan Văn Trị', N'4D, Phan Đình Phùng	 , Quận Bình Tân, TP. Hồ Chí M')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000000', 'DT00000000', N'Nguyễn Xí', N'25, Đường D2, Quận 6, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000003', 'DT00000003', N'Quốc Lộ 13', N'1B, Đường D5, Quận 11, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000004', 'DT00000002', N'Võ Trường Toản', N'7D, Nguyễn Khuyến, Quận 11, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000003', 'DT00000001', N'Ngô Nhân Tịnh', N'1B, Đường số 16, Thành Phố Thủ Đức, TP. Hồ Chí Min')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000002', 'DT00000000', N'Lương Ngọc Quyến', N'5E, Bùi Hữu Nghĩa, Quận 5, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000001', 'DT00000000', N'Lê Tự Tài', N'97, Tầm Vu, Thành Phố Thủ Đức, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000006', 'DT00000004', N'Đường số 4', N'16, Lê Tự Tài, Quận Tân Bình, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000002', 'DT00000002', N'Đống Đa', N'89, Đường số 82, Quận 6, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000005', 'DT00000003', N'Đường số 6', N'68, Đường số 16, Quận 7, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000002', 'DT00000001', N'Bạch Đằng', N'78, Vạn Kiếp, Quận 8, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000004', 'DT00000003', N'Điện Biên Phủ', N'63, Phan Đăng Lưu, Quận 7, TP. Hồ Chí Minh')
INSERT dbo.ChiNhanh(MaCN, MaDT, TenCN, DiaChi) VALUES ('CN00000003', 'DT00000002', N'Đinh Tiên Hoàng', N'54, Nơ Trang Long, Quận 5, TP. Hồ Chí Minh')
GO

--
-- Inserting data into table dbo.DonHang
--
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000000', N'Chuyển Khoản', N'2D, Nguyễn Khuyến, Quận Tân Bình, TP. Hồ Chí Minh', 'KH00000004', N'Chưa Giao', 'TX00000004', 'DT00000001', '2008-02-02')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000001', N'Chuyển Khoản', N'5B, Văn Thánh Bắc, Quận Phú Nhuận, TP. Hồ Chí Minh', 'KH00000000', N'Chưa Giao', 'TX00000004', 'DT00000003', '1970-11-16')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000002', N'Chuyển Khoản', N'61, Phan Văn Trị, Huyện Bình Chánh, TP. Hồ Chí Minh', 'KH00000004', N'Đã Giao', 'TX00000003', 'DT00000004', '1983-10-29')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000003', N'Chuyển Khoản', N'8A, Đường số 16, Huyện Củ Chi, TP. Hồ Chí Minh', 'KH00000004', N'Chưa Giao', 'TX00000000', 'DT00000001', '1970-02-16')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000004', N'Tiền Mặt', N'69, Đường D3, Quận 11, TP. Hồ Chí Minh', 'KH00000004', N'Chưa Giao', 'TX00000002', 'DT00000000', '1970-04-04')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000005', N'Tiền Mặt', N'8E, Phó Đức Chính, Quận Gò Vấp, TP. Hồ Chí Minh', 'KH00000003', N'Đã Giao', 'TX00000004', 'DT00000001', '2015-06-23')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000006', N'Chuyển Khoản', N'75, Nguyễn Huy Tưởng, Quận 7, TP. Hồ Chí Minh', 'KH00000003', N'Đang Giao', 'TX00000003', 'DT00000003', '1970-01-09')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000007', N'Tiền Mặt', N'96, Nguyễn An Ninh, Huyện Hóc Môn, TP. Hồ Chí Minh', 'KH00000003', N'Đã Giao', 'TX00000001', 'DT00000001', '1970-02-08')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000008', N'Tiền Mặt', N'68, Nguyên Hồng, Quận 10, TP. Hồ Chí Minh', 'KH00000001', N'Chưa Giao', 'TX00000004', 'DT00000002', '1988-06-03')
INSERT dbo.DonHang(MaDH, HTThanhToan, DiaChiGiaoHang, MaKH, TinhTrang, MaTX, MaDT, NgayLap) VALUES ('DH00000009', N'Chuyển Khoản', NULL, 'KH00000001', N'Đã Giao', 'TX00000002', 'DT00000001', '1991-12-10')
GO

--
-- Inserting data into table dbo.HopDong
--
INSERT dbo.HopDong(MaHD, MaSoThueDT, NguoiDaiDien, MaDT, ThoiHan, MaNV) VALUES ('HD00000000', '7879717760', N'Huỳnh Đình Trung', 'DT00000004', '2027-04-23', 'NV00000001')
INSERT dbo.HopDong(MaHD, MaSoThueDT, NguoiDaiDien, MaDT, ThoiHan, MaNV) VALUES ('HD00000001', '1160027260', N'Võ Hải Đăng', 'DT00000000', '2024-11-07', 'NV00000003')
INSERT dbo.HopDong(MaHD, MaSoThueDT, NguoiDaiDien, MaDT, ThoiHan, MaNV) VALUES ('HD00000002', '1075582803', N'Võ Thành Đạt', 'DT00000003', '2024-09-21', 'NV00000000')
INSERT dbo.HopDong(MaHD, MaSoThueDT, NguoiDaiDien, MaDT, ThoiHan, MaNV) VALUES ('HD00000003', '7306679727', N'Huỳnh Cát Anh', 'DT00000002', '2029-03-27', 'NV00000003')
INSERT dbo.HopDong(MaHD, MaSoThueDT, NguoiDaiDien, MaDT, ThoiHan, MaNV) VALUES ('HD00000004', '9945391920', N'Vũ An Nhiên', 'DT00000000', '2027-05-30', 'NV00000000')
GO

--
-- Inserting data into table dbo.CT_DonHang
--
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000009', 'SP00000009', 56, 47000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000001', 'SP00000001', 57, 63000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000004', 'SP00000004', 69, 65000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000000', 'SP00000000', 46, 53000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000003', 'SP00000003', 48, 69000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000002', 'SP00000003', 31, 57000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000001', 'SP00000002', 69, 55000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000000', 'SP00000001', 43, 66000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000005', 'SP00000005', 38, 44000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000004', 'SP00000005', 13, 55000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000002', 'SP00000002', 78, 47000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000003', 'SP00000004', 72, 49000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000006', 'SP00000006', 19, 45000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000008', 'SP00000008', 61, 68000)
INSERT dbo.CT_DonHang(MaDH, MaSP, SoLuong, GiaBan) VALUES ('DH00000007', 'SP00000007', 13, 67000)
GO

--
-- Inserting data into table dbo.CT_HopDong
--
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000004', 'HD00000004', 'DT00000002')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000001', 'HD00000001', 'DT00000001')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000003', 'HD00000004', 'DT00000003')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000005', 'HD00000000', 'DT00000004')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000000', 'HD00000003', 'DT00000000')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000003', 'HD00000002', 'DT00000003')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000000', 'HD00000001', 'DT00000000')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000004', 'HD00000000', 'DT00000004')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000001', 'HD00000000', 'DT00000001')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000003', 'HD00000004', 'DT00000001')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000004', 'HD00000002', 'DT00000004')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000004', 'HD00000003', 'DT00000002')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000004', 'HD00000001', 'DT00000004')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000003', 'HD00000003', 'DT00000003')
INSERT dbo.CT_HopDong(MaCN, MaHD, MaDT) VALUES ('CN00000000', 'HD00000002', 'DT00000000')
GO

--
-- Inserting data into table dbo.SanPhamChiNhanh
--
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000004', 'CN00000006', 'SP00000009', 8928)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000001', 'CN00000001', 'SP00000001', 9600)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000003', 'CN00000003', 'SP00000004', 9371)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000004', 'CN00000005', 'SP00000000', 58)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000000', 'CN00000000', 'SP00000003', 1471)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000000', 'CN00000000', 'SP00000002', 8526)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000004', 'CN00000004', 'SP00000001', 8452)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000001', 'CN00000001', 'SP00000000', 3405)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000002', 'CN00000004', 'SP00000005', NULL)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000002', 'CN00000004', 'SP00000004', 839)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000004', 'CN00000004', 'SP00000002', 2924)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000003', 'CN00000003', 'SP00000003', 8195)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000001', 'CN00000003', 'SP00000006', 4588)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000000', 'CN00000001', 'SP00000008', 2250)
INSERT dbo.SanPhamChiNhanh(MaDT, MaCN, MaSP, SLTon) VALUES ('DT00000000', 'CN00000002', 'SP00000007', 7005)
GO

--
-- Enabling DML triggers for dbo.KhachHang
--
ENABLE TRIGGER ALL ON dbo.KhachHang
GO

--
-- Enabling DML triggers for dbo.NhanVien
--
ENABLE TRIGGER ALL ON dbo.NhanVien
GO

--
-- Enabling DML triggers for dbo.TaiXe
--
ENABLE TRIGGER ALL ON dbo.TaiXe
GO

--
-- Enabling DML triggers for dbo.ChiNhanh
--
ENABLE TRIGGER ALL ON dbo.ChiNhanh
GO

--
-- Enabling DML triggers for dbo.DonHang
--
ENABLE TRIGGER ALL ON dbo.DonHang
GO

--
-- Enabling DML triggers for dbo.CT_DonHang
--
ENABLE TRIGGER ALL ON dbo.CT_DonHang
GO

--
-- Enabling DML triggers for dbo.CT_HopDong
--
ENABLE TRIGGER ALL ON dbo.CT_HopDong
GO

--
-- Set NOEXEC to off
--

SET NOEXEC OFF
GO