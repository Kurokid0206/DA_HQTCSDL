use QLGH
go

create function f_Auto_MaDT() 
returns char(10)
AS
begin
	declare @MaDT as varchar(10) ='00000001'
	while(exists(SELECT*
				FROM DoiTac
				WHERE MaDT ='DT'+ @MaDT))
		BEGIN
			SET @MaDT = @MaDT+1
			SET @MaDT=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaDT)))) + CONVERT(varchar(10),@MaDT)
		END
	set @MaDT = 'DT' + @MaDT
	return @MaDT
end
go

create function f_Auto_MaHD() 
returns char(10)
AS
begin
	declare @MaHD as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM HopDong
				 WHERE MaHD ='HD'+ @MaHD))
		BEGIN
			SET @MaHD = @MaHD+1
			SET @MaHD=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaHD)))) + CONVERT(varchar(10),@MaHD)
		END
	set @MaHD = 'HD' + @MaHD
	return @MaHD
end
go

create function f_Auto_MaKH() 
returns char(10)
AS
begin
	declare @MaKH as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM KhachHang
				 WHERE MaKH ='KH'+ @MaKH))
		BEGIN
			SET @MaKH = @MaKH+1
			SET @MaKH=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaKH)))) + CONVERT(varchar(10),@MaKH)
		END
	set @MaKH = 'KH' + @MaKH
	return @MaKH
end
go

create function f_Auto_MaTX() 
returns char(10)
AS
begin
	declare @MaTX as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM TaiXe
				 WHERE MaTX ='TX'+ @MaTX))
		BEGIN
			SET @MaTX = @MaTX+1
			SET @MaTX=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaTX)))) + CONVERT(varchar(10),@MaTX)
		END
	set @MaTX = 'TX' + @MaTX
	return @MaTX
end
go

create function f_Auto_MaCN(@MaDT char(10)) 
returns char(10)
AS
begin
	declare @MaCN as varchar(10) ='00000001'
	while(exists(SELECT *
				 FROM ChiNhanh
				 WHERE MaDT = @MaDT and MaCN ='CN'+ @MaCN))
		BEGIN
			SET @MaCN = @MaCN+1
			SET @MaCN=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaCN)))) + CONVERT(varchar(10),@MaCN)
		END
	set @MaCN = 'CN' + @MaCN
	return @MaCN
end
go

create function f_Auto_MaSP() 
returns char(10)
AS
begin
	declare @MaSP as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM SanPham
				 WHERE MaSP ='SP'+ @MaSP))
		BEGIN
			SET @MaSP = @MaSP + 1
			SET @MaSP= REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaSP)))) + CONVERT(varchar(10),@MaSP)
		END
	set @MaSP = 'SP' + @MaSP
	return @MaSP
end
go

create function f_Auto_MaDH() 
returns char(10)
AS
begin
	declare @MaDH as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM DonHang
				 WHERE MaDH ='DH'+ @MaDH))
		BEGIN
			SET @MaDH = @MaDH+1
			SET @MaDH=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaDH)))) + CONVERT(varchar(10),@MaDH)
		END
	set @MaDH = 'DH' + @MaDH
	return @MaDH
end
go

create function f_Auto_MaNV() 
returns char(10)
AS
begin
	declare @MaNV as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM NhanVien
				 WHERE MaNV ='NV'+ @MaNV))
		BEGIN
			SET @MaNV = @MaNV+1
			SET @MaNV=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaNV)))) + CONVERT(varchar(10),@MaNV)
		END
	set @MaNV = 'NV' + @MaNV
	return @MaNV
end
go