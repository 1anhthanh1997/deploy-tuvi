const {
  dichCung,
  ngayThangNam,
  ngayThangNamCanChi,
  nguHanh,
  nguHanhNapAm,
  thienCan,
  timCoThan,
  timCuc,
  timHoaLinh,
  timLuuTru,
  timPhaToai,
  timThienKhoi,
  timThienMa,
  timThienQuanThienPhuc,
  timTrangSinh,
  timTriet,
  timTuVi,
  diaChi,
} = require("./amDuong.js");

const {
  saoAnQuang,
  saoBachHo,
  saoBacSy,
  saoBatToa,
  saoBenh,
  saoBenhPhu,
  saoCoThan,
  saoCuMon,
  saoDaiHao,
  saoDaLa,
  saoDaoHoa,
  saoDauQuan,
  saoDeVuong,
  saoDiaGiai,
  saoDiaKhong,
  saoDiaKiep,
  saoDiaVong,
  saoDieuKhach,
  saoDuong,
  saoDuongPhu,
  saoGiaiThan,
  saoHoaCai,
  saoHoaKhoa,
  saoHoaKy,
  saoHoaLoc,
  saoHoaQuyen,
  saoHoaTinh,
  saoHongLoan,
  saoHuuBat,
  saoHyThan,
  saoKiepSat,
  saoKinhDuong,
  saoLamQuan,
  saoLiemTrinh,
  saoLinhTinh,
  saoLocTon,
  saoLongDuc,
  saoLongTri,
  saoLucSi,
  saoLuuHa,
  saoMo,
  saoMocDuc,
  saoNguyetDuc,
  saoPhaQuan,
  saoPhaToai,
  saoPhiLiem,
  saoPhongCao,
  saoPhucBinh,
  saoPhucDuc,
  saoPhuongCac,
  saoQuanDoi,
  saoQuanPhu2,
  saoQuanPhu3,
  saoQuaTu,
  saoQuocAn,
  saoSuy,
  saoTamThai,
  saoTangMon,
  saoTaPhu,
  saoTauThu,
  saoThai,
  saoThaiAm,
  saoThaiDuong,
  saoThaiPhu,
  saoThaiTue,
  saoThamLang,
  saoThanhLong,
  saoThatSat,
  saoThienCo,
  saoThienDong,
  saoThienDuc,
  saoThienGiai,
  saoThienHinh,
  saoThienHu,
  saoThienHy,
  saoThienKhoc,
  saoThienKhoi,
  // saoThienKhong,
  saoThienLa,
  saoThienLuong,
  saoThienMa,
  saoThienPhu,
  saoThienPhuc,
  saoThienQuan,
  saoThienQuy,
  saoThienRieu,
  saoThienSu,
  saoThienTai,
  saoThienTho,
  saoThienThuong,
  saoThienTru,
  saoThienTuong,
  saoThienViet,
  saoThienY,
  saoThieuAm,
  saoThieuDuong,
  saoTieuHao,
  saoTrangSinh,
  saoTrucPhu,
  saoTu,
  saoTuePha,
  saoTuongQuan,
  saoTuPhu,
  saoTuVi,
  saoTuyet,
  saoVanKhuc,
  saoVanTinh,
  saoVanXuong,
  saoVuKhuc,
  Sao,
} = require("./sao.js");

function cloneSaoLuu(sao, type, saoLoai) {
  return new Sao(
    sao.saoId,
    type + sao.saoTen,
    type + sao.saoTenEn,
    sao.saoNguHanh,
    saoLoai ? saoLoai : sao.saoLoai,
    sao.saoPhuongVi,
    sao.saoAmDuong,
    sao.saoVongTrangSinh,
    sao.saoLuuNien
  );
}

function addSaoLuu(
  diaBan,
  can,
  chi,
  cucSo,
  nn,
  gioSinh,
  gioiTinh,
  type,
  thangAm,
  luuNguyet
) {
  const SAO_DAI_VAN_TYPE = "X. ";
  const SAO_LUU_NIEN_TYPE = "Y. ";
  const SAO_LUU_NGUYET_TYPE = "M. ";
  const SAO_LUU_NHAT_TYPE = "D. ";
  const amDuongNamSinh = thienCan[can].amDuong;
  const amDuongchiSinh = diaChi[chi].amDuong;

  // Bản Mệnh chính là Ngũ hành nạp âm của năm sinh
  // const banMenh = nguHanhNapAm(can, chi);

  // Bắt đầu an Tử vi tinh hệ
  const viTriTuVi = timTuVi(cucSo, nn);

  const viTriLiemTrinh = dichCung(viTriTuVi, 4);

  const viTriThienDong = dichCung(viTriTuVi, 7);

  const viTriVuKhuc = dichCung(viTriTuVi, 8);

  const vitriThaiDuong = dichCung(viTriTuVi, 9);

  const viTriThienCo = dichCung(viTriTuVi, 11);

  // Thiên phủ tinh hệ
  // viTriTuVi = 4
  const viTriThienPhu = dichCung(3, 3 - viTriTuVi);

  const viTriThaiAm = dichCung(viTriThienPhu, 1);

  const viTriThamLang = dichCung(viTriThienPhu, 2);

  const viTriCuMon = dichCung(viTriThienPhu, 3);

  const viTriThienTuong = dichCung(viTriThienPhu, 4);

  const viTriThienLuong = dichCung(viTriThienPhu, 5);

  const viTriThatSat = dichCung(viTriThienPhu, 6);

  const viTriPhaQuan = dichCung(viTriThienPhu, 10);

  const viTriTaPhu = dichCung(5, thangAm - 1);
  const viTriHuuBat = dichCung(2, 2 - viTriTaPhu);
  const viTriVanKhuc = dichCung(5, gioSinh - 1);
  const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc);
  if (type === SAO_LUU_NGUYET_TYPE) {
    diaBan.nhapSao(viTriTaPhu, cloneSaoLuu(saoTaPhu, type));
    diaBan.nhapSao(viTriHuuBat, cloneSaoLuu(saoHuuBat, type));
    diaBan.nhapSao(viTriVanKhuc, cloneSaoLuu(saoVanKhuc, type));
    diaBan.nhapSao(viTriVanXuong, cloneSaoLuu(saoVanXuong, type));
  }
  // Vòng Lộc tồn
  // Vị trí sao Lộc tồn ở Can của năm sinh trên địa bàn
  // sao Bác sỹ ở cùng cung với Lộc tồn
  const viTriLocTon = thienCan[can].vitriDiaBan;

  diaBan.nhapSao(viTriLocTon, cloneSaoLuu(saoLocTon, type));

  // diaBan.nhapSao(viTriLocTon, cloneSaoLuu(saoBacSy, type));

  const amDuongNamNu = gioiTinh * amDuongNamSinh;
  const viTriLucSi = dichCung(viTriLocTon, 1 * amDuongNamNu);
  diaBan.nhapSao(viTriLucSi, cloneSaoLuu(saoLucSi, type));

  const viTriThanhLong = dichCung(viTriLocTon, 2 * amDuongNamNu);
  diaBan.nhapSao(viTriThanhLong, cloneSaoLuu(saoThanhLong, type));

  const viTriTieuHao = dichCung(viTriLocTon, 3 * amDuongNamNu);
  diaBan.nhapSao(viTriTieuHao, cloneSaoLuu(saoTieuHao, type));

  const viTriTuongQuan = dichCung(viTriLocTon, 4 * amDuongNamNu);
  diaBan.nhapSao(viTriTuongQuan, cloneSaoLuu(saoTuongQuan, type));

  const viTriTauThu = dichCung(viTriLocTon, 5 * amDuongNamNu);
  diaBan.nhapSao(viTriTauThu, cloneSaoLuu(saoTauThu, type));

  const viTriPhiLiem = dichCung(viTriLocTon, 6 * amDuongNamNu);
  diaBan.nhapSao(viTriPhiLiem, cloneSaoLuu(saoPhiLiem, type));

  const viTriHyThan = dichCung(viTriLocTon, 7 * amDuongNamNu);
  diaBan.nhapSao(viTriHyThan, cloneSaoLuu(saoHyThan, type));

  const viTriBenhPhu = dichCung(viTriLocTon, 8 * amDuongNamNu);
  diaBan.nhapSao(viTriBenhPhu, cloneSaoLuu(saoBenhPhu, type));

  const viTriDaiHao = dichCung(viTriLocTon, 9 * amDuongNamNu);
  diaBan.nhapSao(viTriDaiHao, cloneSaoLuu(saoDaiHao, type));

  const viTriPhucBinh = dichCung(viTriLocTon, 10 * amDuongNamNu);
  diaBan.nhapSao(viTriPhucBinh, cloneSaoLuu(saoPhucBinh, type));

  const viTriQuanPhu2 = dichCung(viTriLocTon, 11 * amDuongNamNu);
  diaBan.nhapSao(viTriQuanPhu2, cloneSaoLuu(saoQuanPhu2, type));

  // Vòng Địa chi - Thái tuế
  const viTriThaiTue = chi;
  diaBan.nhapSao(viTriThaiTue, cloneSaoLuu(saoThaiTue, type));

  const viTriThieuDuong = dichCung(viTriThaiTue, 1);

  const viTriTangMon = dichCung(viTriThaiTue, 2);
  diaBan.nhapSao(viTriTangMon, cloneSaoLuu(saoTangMon, type));

  const viTriQuanPhu3 = dichCung(viTriThaiTue, 4);
  diaBan.nhapSao(viTriQuanPhu3, cloneSaoLuu(saoQuanPhu3, type));

  const viTriBachHo = dichCung(viTriThaiTue, 8);
  diaBan.nhapSao(viTriBachHo, cloneSaoLuu(saoBachHo, type));

  const viTriDieuKhach = dichCung(viTriThaiTue, 10);
  diaBan.nhapSao(viTriDieuKhach, cloneSaoLuu(saoDieuKhach, type));

  // An sao đôi
  // Kình dương - Đà la
  const viTriDaLa = dichCung(viTriLocTon, -1);
  diaBan.nhapSao(viTriDaLa, cloneSaoLuu(saoDaLa, type));

  const viTriKinhDuong = dichCung(viTriLocTon, 1);
  diaBan.nhapSao(viTriKinhDuong, cloneSaoLuu(saoKinhDuong, type));

  // Không - Kiếp
  // Khởi giờ Tý ở cung Hợi, đếm thuận đến giờ sinh được cung Địa kiếp
  // const viTriDiaKiep = dichCung(11, gioSinh);
  // diaBan.nhapSao(viTriDiaKiep, cloneSaoLuu(saoDiaKiep, type));

  // const viTriDiaKhong = dichCung(12, 12 - viTriDiaKiep);
  // diaBan.nhapSao(viTriDiaKhong, cloneSaoLuu(saoDiaKhong, type));

  // const [viTriHoaTinh, viTriLinhTinh] = timHoaLinh(
  //   chi,
  //   gioSinh,
  //   gioiTinh,
  //   amDuongNamSinh
  // );
  // diaBan.nhapSao(viTriHoaTinh, cloneSaoLuu(saoHoaTinh, type));
  // diaBan.nhapSao(viTriLinhTinh, cloneSaoLuu(saoLinhTinh, type));

  const viTriLongTri = dichCung(5, chi - 1);
  // diaBan.nhapSao(viTriLongTri, saoLongTri);

  const viTriPhuongCac = dichCung(2, 2 - viTriLongTri);
  diaBan.nhapSao(viTriPhuongCac, cloneSaoLuu(saoPhuongCac, type));
  // diaBan.nhapSao(viTriPhuongCac, saoGiaiThan);

  // ! Vị trí sao Ân Quang - Thiên Quý
  // ! Lấy cung thìn làm mồng 1 đếm thuận đến ngày sinh,
  // ! lui lại một cung để lấy đó làm giờ tý đếm thuận đến giờ sinh là
  // Ân Quang
  // ! Thiên Quý đối với Ân Quang qua trục Sửu Mùi
  // @ viTriAnQuang = dichCung(5, nn + gioSinh - 3)
  // @ viTriThienQuy = dichCung(2, 2 - viTriAnQuang)
  // Phía trên là cách an Quang-Quý theo cụ Vu Thiên
  // Sau khi tìm hiểu thì Quang-Quý sẽ được an theo Xương-Khúc như sau:
  // Ân Quang − Xem Văn Xương ở cung nào, kể cung ấy là mồng một
  // bắt đầu đếm thoe chiều thuận đến ngày sinh, lùi lại một cung,
  // an Ân Quang.
  // Thiên Quý − Xem Văn Khúc ở cung nào, kể cung ấy là mồng một,
  // !!! bắt đầu đếm theo chiều nghịch đến ngày sinh, lùi lại một cung,
  // an Thiên Quý.!!!
  // ??? Thiên Quý ở đối cung của Ân Quang qua trục Sửu Mùi mới chính xác???

  // const viTriAnQuang = dichCung(viTriVanXuong, nn - 2);
  // diaBan.nhapSao(viTriAnQuang, saoAnQuang);

  // const viTriThienQuy = dichCung(2, 2 - viTriAnQuang);
  // diaBan.nhapSao(viTriThienQuy, saoThienQuy);

  const viTriThienKhoi = timThienKhoi(can);
  diaBan.nhapSao(viTriThienKhoi, cloneSaoLuu(saoThienKhoi, type));

  const viTriThienViet = dichCung(5, 5 - viTriThienKhoi);
  diaBan.nhapSao(viTriThienViet, cloneSaoLuu(saoThienViet, type));

  const viTriThienHu = dichCung(7, chi - 1);
  diaBan.nhapSao(viTriThienHu, cloneSaoLuu(saoThienHu, type));

  const viTriThienKhoc = dichCung(7, -chi + 1);
  diaBan.nhapSao(viTriThienKhoc, cloneSaoLuu(saoThienKhoc, type));

  // const viTriThienTai = dichCung(diaBan.cungMenh, chi - 1);
  // diaBan.nhapSao(viTriThienTai, saoThienTai);

  // const viTriThienTho = dichCung(diaBan.cungThan, chi - 1);
  // diaBan.nhapSao(viTriThienTho, saoThienTho);

  const viTriHongLoan = dichCung(4, -chi + 1);
  diaBan.nhapSao(viTriHongLoan, cloneSaoLuu(saoHongLoan, type));

  const viTriThienHy = dichCung(viTriHongLoan, 6);
  diaBan.nhapSao(viTriThienHy, cloneSaoLuu(saoThienHy, type));

  // Thiên Quan - Thiên Phúc
  if (luuNguyet) {
    const viTriThienHinh = dichCung(10, thangAm - 1);
    if (type === SAO_LUU_NGUYET_TYPE) {
      diaBan.nhapSao(viTriThienHinh, cloneSaoLuu(saoThienHinh, type, 15));
    }
    const viTriThienRieu = dichCung(viTriThienHinh, 4);

    diaBan.nhapSao(
      viTriThienRieu,
      cloneSaoLuu(saoThienRieu, type, 13),
      cloneSaoLuu(saoThienY, type, 5)
    );
  }

  const viTriCoThan = timCoThan(chi);
  diaBan.nhapSao(viTriCoThan, cloneSaoLuu(saoCoThan, type));

  const viTriQuaTu = dichCung(viTriCoThan, -4);
  diaBan.nhapSao(viTriQuaTu, cloneSaoLuu(saoQuaTu, type));

  const viTriVanTinh = dichCung(viTriKinhDuong, 2);
  // diaBan.nhapSao(viTriVanTinh, saoVanTinh);

  const viTriDuongPhu = dichCung(viTriVanTinh, 2);
  diaBan.nhapSao(viTriDuongPhu, cloneSaoLuu(saoDuongPhu, type));

  const viTriQuocAn = dichCung(viTriDuongPhu, 3);
  diaBan.nhapSao(viTriQuocAn, cloneSaoLuu(saoQuocAn, type));

  // Vòng Thiên mã
  const viTriThienMa = timThienMa(chi);
  diaBan.nhapSao(viTriThienMa, cloneSaoLuu(saoThienMa, type));

  const viTriHoaCai = dichCung(viTriThienMa, 2);
  diaBan.nhapSao(viTriHoaCai, cloneSaoLuu(saoHoaCai, type));

  const viTriKiepSat = dichCung(viTriThienMa, 3);
  // diaBan.nhapSao(viTriKiepSat, saoKiepSat);

  const viTriDaoHoa = dichCung(viTriKiepSat, 4);
  diaBan.nhapSao(viTriDaoHoa, cloneSaoLuu(saoDaoHoa, type));

  // An Lưu Hà - Thiên Trù
  let [viTriLuuHa, viTriThienTru] = timLuuTru(can);
  diaBan.nhapSao(viTriLuuHa, cloneSaoLuu(saoLuuHa, type));
  // diaBan.nhapSao(viTriThienTru, saoThienTru);

  // An Tuần, Triệt
  let ketThucTuan = dichCung(chi, 10 - can);
  let viTriTuan1 = dichCung(ketThucTuan, 1);
  let viTriTuan2 = dichCung(viTriTuan1, 1);

  let [viTriTriet1, viTriTriet2] = timTriet(can);
  switch (type) {
    case SAO_DAI_VAN_TYPE:
      diaBan.nhapDaiVanTuan(viTriTuan1, viTriTuan2);
      diaBan.nhapDaiVanTriet(viTriTriet1, viTriTriet2);
      break;
    case SAO_LUU_NIEN_TYPE:
      diaBan.nhapLuuNienTuan(viTriTuan1, viTriTuan2);
      diaBan.nhapLuuNienTriet(viTriTriet1, viTriTriet2);
      break;
    case SAO_LUU_NGUYET_TYPE:
      diaBan.nhapLuuNguyetTuan(viTriTuan1, viTriTuan2);
      diaBan.nhapLuuNguyetTriet(viTriTriet1, viTriTriet2);
      break;
    case SAO_LUU_NHAT_TYPE:
      diaBan.nhapLuuNhatTuan(viTriTuan1, viTriTuan2);
      diaBan.nhapLuuNhatTriet(viTriTriet1, viTriTriet2);
      break;
    default:
      break;
  }

  // Tứ Hóa
  // An theo 10 câu của cụ Thiên Lương trong cuốn
  // Số tử vi dưới mắt khoa học

  let viTriHoaLoc, viTriHoaQuyen, viTriHoaKhoa, viTriHoaKy; //

  switch (can) {
    case 1:
      viTriHoaLoc = viTriLiemTrinh;
      viTriHoaQuyen = viTriPhaQuan;
      viTriHoaKhoa = viTriVuKhuc;
      viTriHoaKy = vitriThaiDuong;
      break;
    case 2:
      viTriHoaLoc = viTriThienCo;
      viTriHoaQuyen = viTriThienLuong;
      viTriHoaKhoa = viTriTuVi;
      viTriHoaKy = viTriThaiAm;
      break;
    case 3:
      viTriHoaLoc = viTriThienDong;
      viTriHoaQuyen = viTriThienCo;
      viTriHoaKhoa = viTriVanXuong;
      viTriHoaKy = viTriLiemTrinh;
      break;
    case 4:
      viTriHoaLoc = viTriThaiAm;
      viTriHoaQuyen = viTriThienDong;
      viTriHoaKhoa = viTriThienCo;
      viTriHoaKy = viTriCuMon;
      break;
    case 5:
      viTriHoaLoc = viTriThamLang;
      viTriHoaQuyen = viTriThaiAm;
      viTriHoaKhoa = viTriHuuBat;
      viTriHoaKy = viTriThienCo;
      break;
    case 6:
      viTriHoaLoc = viTriVuKhuc;
      viTriHoaQuyen = viTriThamLang;
      viTriHoaKhoa = viTriThienLuong;
      viTriHoaKy = viTriVanKhuc;
      break;
    case 7:
      viTriHoaLoc = vitriThaiDuong;
      viTriHoaQuyen = viTriVuKhuc;
      viTriHoaKhoa = viTriThaiAm;
      viTriHoaKy = viTriThienDong;
      break;
    case 8:
      viTriHoaLoc = viTriCuMon;
      viTriHoaQuyen = vitriThaiDuong;
      viTriHoaKhoa = viTriVanKhuc;
      viTriHoaKy = viTriVanXuong;
      break;
    case 9:
      viTriHoaLoc = viTriThienLuong;
      viTriHoaQuyen = viTriTuVi;
      viTriHoaKhoa = viTriTaPhu;
      viTriHoaKy = viTriVuKhuc;
      break;
    case 10:
      viTriHoaLoc = viTriPhaQuan;
      viTriHoaQuyen = viTriCuMon;
      viTriHoaKhoa = viTriThaiAm;
      viTriHoaKy = viTriThamLang;
      break;
  }

  diaBan.nhapSao(viTriHoaLoc, cloneSaoLuu(saoHoaLoc, type));

  diaBan.nhapSao(viTriHoaQuyen, cloneSaoLuu(saoHoaQuyen, type));

  diaBan.nhapSao(viTriHoaKhoa, cloneSaoLuu(saoHoaKhoa, type));

  diaBan.nhapSao(viTriHoaKy, cloneSaoLuu(saoHoaKy, type));

  return diaBan;
}

module.exports = {
  addSaoLuu,
};
