use QLGH
go

--drop proc sp_Insert_KhackHang

create procedure sp_Insert_KhackHang 
	@MaKH char(10) output,
	@HoTen nvarchar(50), 
	@SDT char(10), 
	@DiaChi nvarchar(100), 
	@Email varchar(50),
	@TK varchar(50),
	@MK varchar(20)
as	
begin tran
	begin try
		insert into TaiKhoan values(@TK,@MK,@HoTen,N'Khách Hàng','Enabled')
		set @MaKH = dbo.f_Auto_MaKH()
		insert into KhachHang
		values (@MaKH, @HoTen, @SDT, @DiaChi, @Email, @TK)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_Insert_NhanVien 
	@MaNV char(10) output,
	@TenNV nvarchar(50),
	@TK varchar(50),
	@MK varchar(50)
as	
begin tran
	begin try
		insert into TaiKhoan values(@TK,@MK,@TenNV,N'Nhân Viên','Enabled')
		set @MaNV = dbo.f_Auto_MaNV()
		insert into NhanVien
		values (@MaNV, @TenNV, @TK)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go
--drop proc sp_Insert_TaiXe
create procedure sp_Insert_TaiXe 
	@MaTX char(10) output,
	@HoTen nvarchar(50), 
	@CMND varchar(12), 
	@SDT varchar(12), 
	@DiaChi nvarchar(100), 
	@BienSoXe varchar(9), 
	@KhuVucHD nvarchar(50), 
	@Email varchar(50),
	@TKNganHang varchar(15),
	@TK varchar(50),
	@MK varchar(50)
as	
begin tran
	begin try
		insert into TaiKhoan values(@TK, @MK, @HoTen,N'Tài Xế','Enabled')
		set @MaTX = dbo.f_Auto_MaTX()
		insert into TaiXe
		values (@MaTX, @HoTen, @CMND, @SDT, @DiaChi, @BienSoXe, @KhuVucHD, @Email, @TKNganHang, @TK)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go
--drop proc sp_Insert_DoiTac
create procedure sp_Insert_DoiTac
	@MaDT char(10) output,
	@TenDT nvarchar(50), 
	@NguoiDD nvarchar(50),
	@TP nvarchar(50), 
	@Quan nvarchar(50), 
	@SoLuongDon int, 
	@LoaiHangVC nvarchar(50),
	@DiaChi nvarchar(100), 
	@SDT char(10), 
	@Email varchar(50),
	@TK varchar(50),
	@MK varchar(50)
as	
begin tran
	begin try
		insert into TaiKhoan values(@TK,@MK,@TenDT,N'Đối Tác','Enabled')
		set @MaDT = dbo.f_Auto_MaDT()
		insert into DoiTac(MaDT, TenDT, NguoiDaiDien, ThanhPho, Quan,
							SoLuongDonMoiNgay, LoaiHangVanChuyen, SoDienThoai, 
							DiaChiKinhDoanh, Email, TaiKhoan)
		values (@MaDT, @TenDT, @NguoiDD, @TP, @Quan, @SoLuongDon, @LoaiHangVC, @SDT, @DiaChi, @Email, @TK)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_Insert_ChiNhanh 
	@MaCN char(10) output,
	@MaDT char(10), 
	@TenCN nvarchar(50), 
	@DiaChi nvarchar(100)
as	
begin tran
	begin try
		set @MaCN = dbo.f_Auto_MaCN(@MaDT)
		insert into ChiNhanh
		values (@MaDT, @MaCN, @TenCN, @DiaChi)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran; 

go
--drop proc sp_Insert_DonHang

create procedure sp_Insert_DonHang

	@MaDH char(10) output,
	@HTThanhToan nvarchar(50),    
	@DiaChiGiaoHang nvarchar(100), 
	@MaKH char(10),    
	@MaDT char(10)
as
begin tran
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
	begin try
		set @MaDH = dbo.f_Auto_MaDH()
		insert into DonHang(MaDH,HTThanhToan,DiaChiGiaoHang,MaKH,TinhTrang,MaDT,NgayLap)
		values(@MaDH, @HTThanhToan, @DiaChiGiaoHang, @MaKH, N'Chưa Giao', @MaDT, GetDate())
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran
go
--drop proc sp_Insert_CT_DonHang
create procedure sp_Insert_CT_DonHang 
	@MaDH varchar(10), 
	@MaSP varchar(10), 
	@SoLuong int

as
begin tran
	begin try
		declare @DoiTac as char(10) = (select MaDT from DonHang where MaDH = @MaDH)
		declare @SLTon as int = (select SLTon from SanPhamChiNhanh where MaDT = @DoiTac and MaSP = @MaSP)
		if @SoLuong > @SLTon raiserror(N'Không đủ hàng', 16, 1)
		declare @gia as int = (select GiaBan from SanPham where MaSP = @MaSP)
		insert into CT_DonHang (MaDH,MaSP,SoLuong,GiaBan)
		values(@MaDH, @MaSP, @SoLuong, @gia)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_Insert_HopDong
	@MaHD char(10) output,
    @MaSoThueDT char(10),
    @NguoiDaiDien nvarchar(50),
    @SoChiNhanhDK int ,
    @MaDT char(10),
    @ThoiHan date
as
begin tran
	begin try
		set @MaHD = dbo.f_Auto_MaHD()
		insert into HopDong(MaHD,MaSoThueDT,NguoiDaiDien,SoChiNhanhDK,MaDT,ThoiHan)
		values(@MaHD, @MaSoThueDT, @NguoiDaiDien, @SoChiNhanhDK,@MaDT,@ThoiHan)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran; 

go

create procedure sp_Insert_CT_HopDong
    @MaHD char(10),
    @MaDT char(10),
    @MaCN char(10)
as
begin tran
	begin try
		insert into CT_HopDong(MaHD,MaDT,MaCN)
		values(@MaHD, @MaDT, @MaCN)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_Insert_SanPham
	@MaSP char(10) output,
    @TenSP nvarchar(50),
    @GiaBan int
as
begin tran
	begin try
		set @MaSP = dbo.f_Auto_MaSP()
		insert into SanPham
		values(@MaSP, @TenSP, @GiaBan)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_Insert_SP_CN
	@MaDT char(10),
    @MaSP char(10),
	@MaCN char(10),
    @SLTon int
as
begin tran
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
	begin try
		insert into SanPhamChiNhanh
		values(@MaDT, @MaCN, @MaSP, @SLTon)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go
--drop proc sp_TX_Update_TinhTrang
create procedure sp_TX_Update_TinhTrang 
	@MaDH char(10), 
	@Option int
as
begin tran
	begin try
		declare @TinhTrang nvarchar(50)
		if @Option = 1	set @TinhTrang = N'Chưa Giao'
		else if @Option = 2 set @TinhTrang = N'Đang Giao'
		else set @TinhTrang = N'Đã Giao'
		update DonHang 
		set TinhTrang = @TinhTrang where MaDH = @MaDH
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran; 

go

create procedure sp_TX_NhanDH 
	@MaTX char(10), 
	@MaDH char(10)
as
SET TRANSACTION ISOLATION LEVEL READ COMMITTED
begin tran
	begin try
		if ((select MaTX from DonHang where MaDH = @MaDH) is NULL)
		begin
		--waitfor delay '00:00:10'
			update DonHang
			set MaTX = @MaTX where MaDH = @MaDH
			exec sp_TX_Update_TinhTrang @MaDH, 2
		end
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_KH_HuyDH 
	@MaDH char(10)
as
begin tran
	begin try
		if (select TinhTrang from DonHang where MaDH = @MaDH) != N'Đã Giao'
		begin
			delete from CT_DonHang where MaDH = @MaDH
			delete from DonHang where MaDH = @MaDH
		end
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go
--drop proc sp_TX_XemDH
create procedure sp_TX_XemDH 
	@MaTX char(10)
as
begin tran
SET TRANSACTION ISOLATION
LEVEL SERIALIZABLE

	begin try
		declare @KhuVuc as nvarchar(50) = (select KhuVucHoatDong from TaiXe where MaTX = @MaTX)
		select MaDH, HoTen,  TongTien,HTThanhToan, DiaChiGiaoHang from DonHang DH join KhachHang KH on DH.MaKH = KH.MaKH
		where DiaChiGiaoHang like '%' + @KhuVuc + '%' and DH.MaTX is null
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go
--drop proc sp_KH_XemDH
create procedure sp_KH_XemDH 
	@MaKH char(10)
as
begin tran
	begin try
		select MaDH, HTThanhToan, DiaChiGiaoHang, TongTien, NgayLap, TinhTrang 
		from DonHang where MaKH = @MaKH
		
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_KH_XemCTDH 
	@MaDH char(10)
as
begin tran
	begin try
		select SP.MaSP, TenSP, SP.GiaBan, SoLuong, ThanhTien
		from CT_DonHang CTDH join SanPham SP on CTDH.MaSP = SP.MaSP
		where MaDH = @MaDH
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go
--drop proc sp_KH_XemSP
create procedure sp_KH_XemSP 
	@MaDT char(10)
as
begin tran
	begin try
		select SP.MaSP, TenSP, GiaBan 
		from SanPham SP join SanPhamChiNhanh SPCN on SP.MaSP = SPCN.MaSP
		where MaDT = @MaDT
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

--create procedure sp_KH_DatHang 
--	@MaSP char(10), 
--	@MaKH char(10), 
--	@DiaChi nvarchar(100), 
--	@ThanhToan int, 
--	@SoLuong int
--as
--begin tran
--	begin try
--		declare @HTThanhToan as nvarchar(50)
--		if (@ThanhToan = 1) set @HTThanhToan = 'Chuyển Khoản'
--		else set @HTThanhToan = 'Tiền Mặt'
--		declare @DoiTac as varchar(10) = (select MaDT 
--										from SanPham SP join SanPhamChiNhanh SPCN on SP.MaSP = SPCN.MaSP 
--										where SP.MaSP = @MaSP) 
--		declare @Ngay as date = getdate()
--		declare @MaDH as varchar(10)
--		if not exists (select * from DonHang where MaKH = @MaKH and NgayLap = @Ngay)
--			exec sp_Insert_DonHang @MaDH,@HTThanhToan, @DiaChi, @MaKH, @DoiTac, @Ngay
--		else set @MaDH = (select MaDH from DonHang where MaKH = @MaKH and NgayLap = @Ngay)
--		declare @Gia as int = (select GiaBan from SanPham where MaSP = @MaSP)
--		exec sp_Insert_CT_DonHang @MaDH, @MaSP, @SoLuong, @Gia
--	end try
--	begin catch
--		select  error_number() as errornumber,
--				error_severity() as errorseverity, 
--				error_state() as errorstate,  
--				error_procedure() as errorprocedure,  
--				error_line() as errorline,  
--				error_message() as errormessage; 
--		if @@trancount > 0  
--			rollback tran
--	end catch
--if @@trancount > 0  
--    commit tran;

--go

create procedure sp_NV_LapHD 
	@MaNV varchar(10),
	@MaDT varchar(10), 
	@MST varchar(5), 
	@DaiDien nvarchar(50),
	@MaCN varchar(10),
	@ThoiHan date
as
begin tran
	begin try
		declare @MaHD as char(10)
		declare @SoCN as int = (select count(*) from ChiNhanh group by MaDT having MaDT = @MaDT)
		if not exists(select * from HopDong where MaDT = @MaDT)
			exec sp_Insert_HopDong @MaHD, @MST, @DaiDien, @SoCN, @MaDT, @ThoiHan 
		else set @MaHD = (select MaHD from HopDong where MaDT = @MaDT)
		exec sp_Insert_CT_HopDong @MaHD, @MaDT, @MaCN
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran; 

go

create procedure sp_CN_ThemSP 
	@TenSP nvarchar(50), 
	@GiaBan int, 
	@MaCN varchar(10), 
	@MaDT varchar(10),
	@SLuong int
as
begin tran
	begin try
		declare @MaSP as char(10)
		exec sp_Insert_SanPham @MaSP, @TenSP, @GiaBan
		exec sp_Insert_SP_CN @MaDT, @MaSP, @MaCN, @SLuong
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran; 

go 

--drop proc sp_TK_Login
create procedure sp_TK_Login @TK varchar(50), @MK varchar(20), @Ma char(10) output
as
set tran isolation level repeatable read
begin tran
	begin try
		if exists(select * from TaiKhoan where @TK = TaiKhoan and @MK = MatKhau and TrangThai = 'Enabled')
			begin
			select * from TaiKhoan where @TK = TaiKhoan and @MK = MatKhau
			declare @VaiTro as nvarchar(50)= (select VaiTro from TaiKhoan where TaiKhoan = @TK)
			if @VaiTro = N'Khách Hàng' set @Ma = (select MaKH from KhachHang where TaiKhoan = @TK)
			else if @VaiTro = N'Tài Xế' set @Ma = (select MaTX from TaiXe where TaiKhoan = @TK)
			else if @VaiTro = N'Nhân Viên' set @Ma = (select MaNV from NhanVien where TaiKhoan = @TK)
			else if @VaiTro = N'Đối Tác' set @Ma = (select MaDT from DoiTac where TaiKhoan = @TK)
			else set @Ma = 'QTV0000000' 
			end
		else
		raiserror('Wrong Login',16,1)
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_TK_Disable_Enable_Login @TK varchar(50)
as
begin tran
	begin try
		declare @TinhTrang varchar(10) = (select TrangThai from taikhoan where @tk=taikhoan)
		if @TinhTrang = 'Enabled' set @TinhTrang = 'Disabled'
		else set @TinhTrang = 'Enabled'
		update TaiKhoan
		set TrangThai = @TinhTrang
		where TaiKhoan = @TK
	end try
	begin catch
		select  error_number() as errornumber,
				error_severity() as errorseverity, 
				error_state() as errorstate,  
				error_procedure() as errorprocedure,  
				error_line() as errorline,  
				error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go