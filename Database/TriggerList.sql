use QLGH
go
--Trigger DiaChi cua CT_HopDong phai giong DiaChi cua ChiNhanh
create trigger TRG_DiaChi_CTHD
on CT_HopDong
for insert, update
as
begin
	if UPDATE(MaCN) or UPDATE(MaDT)
	begin
		update CT_HopDong
		set DiaChi = (select CN.DiaChi from ChiNhanh CN, inserted i 
					where i.MaCN = CN.MaCN and i.MaDT = CN.MaDT)
		where exists (select * from inserted i 
					where i.MaCN = CT_HopDong.MaCN and i.MaHD = CT_HopDong.MaHD and i.MaDT = CT_HopDong.MaDT)
	end
end
go

create trigger TRG_DiaChi_ChiNhanh
on ChiNhanh
for update
as
begin
	if UPDATE(DiaChi)
	begin
		update CT_HopDong
		set DiaChi = (select CN.DiaChi from ChiNhanh CN, inserted i 
					where i.MaCN = CN.MaCN and i.MaDT = CN.MaDT)
		where exists (select * from inserted i 
					where i.MaCN = CT_HopDong.MaCN and i.MaDT = CT_HopDong.MaDT)
	end
end
go

--Trigger SoChiNhanhDK = Tong so chi nhanh dang ky trong CT_HopDong
create trigger TRG_SoChiNhanh_HopDong
on CT_HopDong
for insert, update, delete
as
begin
	if UPDATE(MaHD)
	begin
		update HopDong
		set SoChiNhanhDK = (select count(*) from CT_HopDong CTHD, inserted i
							where CTHD.MaHD = i.MaHD)
		where exists (select * from inserted i 
					where i.MaHD = HopDong.MaHD)
	end
	else
	begin
		update HopDong
		set SoChiNhanhDK = (select count(*) from CT_HopDong CTHD, deleted d
							where CTHD.MaHD = d.MaHD)
		where exists (select * from deleted d
					where d.MaHD = HopDong.MaHD)
	end
end
go

--Trigger SoChiNhanh = Tong so chi nhanh thuoc doi tac
create trigger TRG_SoChiNhanh_DoiTac
on ChiNhanh
for insert, update, delete
as
begin
	if UPDATE(MaDT)
	begin
		update DoiTac
		set SoChiNhanh = (select count(*) from ChiNhanh, inserted i
							where ChiNhanh.MaDT = i.MaDT)
		where exists (select * from inserted i 
					where i.MaDT = DoiTac.MaDT)
	end
	else
	begin
		update DoiTac
		set SoChiNhanh = (select count(*) from ChiNhanh, deleted d
							where ChiNhanh.MaDT = d.MaDT)
		where exists (select * from deleted d
					where d.MaDT = DoiTac.MaDT)
	end
end
go

--Trigger GiaBan cua CT_DonHang phai giong GiaBan cua SanPham
create trigger TRG_GiaBan_CTDH
on CT_DonHang
for insert, update
as
begin
	if UPDATE(MaSP)
	begin
		update CT_DonHang
		set GiaBan = (select SP.GiaBan from SanPham SP, inserted i where i.MaSP = SP.MaSP)
		where exists (select * from inserted i where i.MaDH = CT_DonHang.MaDH and i.MaSP = CT_DonHang.MaSP)
	end
end
go

--Trigger ThanhTien = GiaBan * SoLuong
create trigger TRG_TinhThanhTien_CTDH
on CT_DonHang
for insert, update
as
begin
	if UPDATE(SoLuong) or UPDATE(GiaBan)
	begin
		update CT_DonHang
		set ThanhTien = SoLuong*GiaBan
		where exists (select * from inserted i where i.MaDH = CT_DonHang.MaDH and i.MaSP = CT_DonHang.MaSP)
	end
end
go

--Trigger TongTien = Tong cac ThanhTien cung HoaDon
create trigger TRG_TinhTongTien_DonHang
on CT_DonHang
after insert, update, delete
as
begin
	if UPDATE(ThanhTien) or UPDATE(MaDH)
	begin
		update DonHang
		set TongTien = (select SUM(ThanhTien) from CT_DonHang CTDH where DonHang.MaDH = CTDH.MaDH) 
		where exists (select * from inserted i where i.MaDH = DonHang.MaDH)
	end
	else
	begin
		update DonHang
		set TongTien = (select SUM(ThanhTien) from CT_DonHang CTDH where DonHang.MaDH = CTDH.MaDH) 
		where exists (select * from deleted d where d.MaDH = DonHang.MaDH)
	end
end
go

--Trigger tong so hoa don trong ngay <= DoiTac.SoLuongDonMoiNgay
create trigger TRG_Check_SoDonHang
on DonHang
for insert, update
as
begin
	if exists (select * from inserted i 
			where (select COUNT(*) from inserted i, DonHang DH where datediff(dd,i.NgayLap,DH.NgayLap) = 0) > 
			(select SoLuongDonMoiNgay from DoiTac DT where i.MaDT = DT.MaDT))
		begin
			raiserror('So don hang 1 ngay khong vuot qua 20',16,1)
			rollback transaction
		end
end
go

--Trigger tong so hoa don trong ngay <= Tong SLTon cua DoiTac
create trigger TRG_Check_SLTon
on CT_DonHang
for insert, update
as
begin
	if exists (select * from inserted i 
			where (select sum(SLTon) from SanPhamChiNhanh SP_CN where SP_CN.MaSP = i.MaSP) < i.SoLuong)
		begin
			raiserror('Khong du hang de dat',16,1)
			rollback transaction
		end
end
go

--Trigger lấy tên KhachHang, NhanVien, TaiXe từ TaiKhoan
create trigger TRG_KH_HoTen
on KhachHang
for insert, update
as
begin
	if update(TaiKhoan)
	begin
		declare @TK as varchar(50) = (select TaiKhoan from inserted)
		update KhachHang
		set HoTen = (select NguoiDung from TaiKhoan where TaiKhoan = @TK) where TaiKhoan = @TK
	end
end
go

create trigger TRG_NV_HoTen
on NhanVien
for insert, update
as
begin
	if update(TaiKhoan)
	begin
		declare @TK as varchar(50) = (select TaiKhoan from inserted)
		update NhanVien
		set TenNV = (select NguoiDung from TaiKhoan where TaiKhoan = @TK) where TaiKhoan = @TK
	end
end
go

create trigger TRG_TX_HoTen
on TaiXe
for insert, update
as
begin
	if update(TaiKhoan)
	begin
		declare @TK as varchar(50) = (select TaiKhoan from inserted)
		update TaiXe
		set HoTen = (select NguoiDung from TaiKhoan where TaiKhoan = @TK) where TaiKhoan = @TK
	end
end
go

create trigger TRG_DT_TenDT
on DoiTac
for insert, update
as
begin
	if update(TaiKhoan)
	begin
		declare @TK as varchar(50) = (select TaiKhoan from inserted) 
		update DoiTac
		set TenDT = (select NguoiDung from TaiKhoan where TaiKhoan = @TK) where TaiKhoan = @TK
	end
end
go