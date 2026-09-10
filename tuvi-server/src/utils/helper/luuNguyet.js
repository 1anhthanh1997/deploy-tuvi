const {
  dichCung,
  ngayThangNam,
  ngayThangNamCanChi,
  nguHanh,
  thienCan,
  timCuc,
  timTuVi,
  diaChi,
} = require("./amDuong.js");
const fs = require("fs");

const {
  saoCuMon,
  saoHuuBat,
  saoLiemTrinh,
  saoPhaQuan,
  saoTaPhu,
  saoThaiAm,
  saoThaiDuong,
  saoThamLang,
  saoThatSat,
  saoThienCo,
  saoThienDong,
  saoThienHinh,
  saoThienLuong,
  saoThienPhu,
  saoThienRieu,
  saoThienTuong,
  saoTuVi,
  saoVanKhuc,
  saoVanXuong,
  saoVuKhuc,
  saoLuuNguyetTaPhu,
  saoLuuNguyetHuuBat,
  saoLuuNguyetVanXuong,
  saoLuuNguyetVanKhuc,
  saoLuuNguyetThienHinh,
  saoLuuNguyetThienRieu,
  saoLuuNguyetThienY,
  saoLuuNguyetHoaKhoa,
  saoLuuNguyetHoaQuyen,
  saoLuuNguyetHoaLoc,
  saoLuuNguyetHoaKy,
} = require("./sao.js");

/**
 * Lập địa bàn tử vi dựa trên các thông tin ngày sinh
 * @param {Object} DiaBan - Đối tượng địa bàn cần khởi tạo
 * @param {number} nn - Ngày sinh
 * @param {number} tt - Tháng sinh
 * @param {number} nnnn - Năm sinh
 * @param {number} gioSinh - Giờ sinh (theo chi: 1-Tý, 2-Sửu, ..., 12-Hợi)
 * @param {number} gioiTinh - Giới tính (1-Nam, -1-Nữ)
 * @param {boolean} duongLich - Là lịch dương hay không
 * @param {number} timeZone - Múi giờ
 * @returns {Object} - Địa bàn đã được an sao
 */
function lapLuuNguyet(
  DiaBan,
  nn,
  tt,
  nnnn,
  gioSinh,
  gioiTinh,
  duongLich,
  timeZone,
  namXemTieuVan,
  thangLuuNguyet = 1
) {
  let canThang,
    canNam,
    chiNam,
    thangNhuan,
    canLuuThang,
    canLuuNam,
    chiLuuNam,
    luuNguyetNgay,
    luuNguyetThang,
    luuNguyetNam;
  if (duongLich === true) {
    [nn, tt, nnnn, thangNhuan] = ngayThangNam(
      nn,
      tt,
      nnnn,
      duongLich,
      timeZone
    );
  }

  [canThang, canNam, chiNam] = ngayThangNamCanChi(
    nn,
    tt,
    nnnn,
    false,
    timeZone
  );

  [luuNguyetNgay, luuNguyetThang, luuNguyetNam, thangNhuan] = ngayThangNam(
    5,
    5,
    namXemTieuVan,
    duongLich,
    timeZone
  );

  [canLuuThang, canLuuNam, chiLuuNam] = ngayThangNamCanChi(
    5,
    thangLuuNguyet,
    luuNguyetNam,
    false,
    timeZone
  );

  let chiLuuThang = thangLuuNguyet + 2;

  diaBan = new DiaBan(thangLuuNguyet, gioSinh);

  // Bản Mệnh chính là Ngũ hành nạp âm của năm sinh
  // const banMenh = nguHanhNapAm(canNam, chiNam);

  const hanhCuc = timCuc(diaBan.cungMenh, canLuuNam);
  const cuc = nguHanh(hanhCuc);
  const cucSo = cuc.cuc;

  const amDuongChiNamSinh = diaChi[chiNam].amDuong;
  diaBan = diaBan.nhapDaiHan(cucSo, gioiTinh * amDuongChiNamSinh);

  // Nhập tiểu hạn
  const khoiHan = dichCung(11, -3 * (chiNam - 1));
  diaBan = diaBan.nhapTieuHan(khoiHan, gioiTinh, chiNam);

  // Bắt đầu an Tử vi tinh hệ
  const viTriTuVi = timTuVi(cucSo, nn);
  diaBan.nhapSao(viTriTuVi, saoTuVi);

  const viTriLiemTrinh = dichCung(viTriTuVi, 4);
  diaBan.nhapSao(viTriLiemTrinh, saoLiemTrinh);

  const viTriThienDong = dichCung(viTriTuVi, 7);
  diaBan.nhapSao(viTriThienDong, saoThienDong);

  const viTriVuKhuc = dichCung(viTriTuVi, 8);
  diaBan.nhapSao(viTriVuKhuc, saoVuKhuc);

  const vitriThaiDuong = dichCung(viTriTuVi, 9);
  diaBan.nhapSao(vitriThaiDuong, saoThaiDuong);

  const viTriThienCo = dichCung(viTriTuVi, 11);
  diaBan.nhapSao(viTriThienCo, saoThienCo);

  // Thiên phủ tinh hệ
  // viTriTuVi = 4
  const viTriThienPhu = dichCung(3, 3 - viTriTuVi);
  diaBan.nhapSao(viTriThienPhu, saoThienPhu);

  const viTriThaiAm = dichCung(viTriThienPhu, 1);
  diaBan.nhapSao(viTriThaiAm, saoThaiAm);

  const viTriThamLang = dichCung(viTriThienPhu, 2);
  diaBan.nhapSao(viTriThamLang, saoThamLang);

  const viTriCuMon = dichCung(viTriThienPhu, 3);
  diaBan.nhapSao(viTriCuMon, saoCuMon);

  const viTriThienTuong = dichCung(viTriThienPhu, 4);
  diaBan.nhapSao(viTriThienTuong, saoThienTuong);

  const viTriThienLuong = dichCung(viTriThienPhu, 5);
  diaBan.nhapSao(viTriThienLuong, saoThienLuong);

  const viTriThatSat = dichCung(viTriThienPhu, 6);
  diaBan.nhapSao(viTriThatSat, saoThatSat);

  const viTriPhaQuan = dichCung(viTriThienPhu, 10);
  diaBan.nhapSao(viTriPhaQuan, saoPhaQuan);

  if (thangLuuNguyet) {
    const viTriTaPhu = dichCung(5, thangLuuNguyet - 1);
    diaBan.nhapSao(viTriTaPhu, saoLuuNguyetTaPhu);

    const viTriHuuBat = dichCung(2, 2 - viTriTaPhu);
    diaBan.nhapSao(viTriHuuBat, saoLuuNguyetHuuBat);

    const viTriVanKhuc = dichCung(5, gioSinh - 1);
    diaBan.nhapSao(viTriVanKhuc, saoLuuNguyetVanKhuc);

    const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc);
    diaBan.nhapSao(viTriVanXuong, saoLuuNguyetVanXuong);

    const viTriThienHinh = dichCung(10, thangLuuNguyet - 1);
    diaBan.nhapSao(viTriThienHinh, saoLuuNguyetThienHinh);

    const viTriThienRieu = dichCung(viTriThienHinh, 4);
    diaBan.nhapSao(viTriThienRieu, saoLuuNguyetThienRieu, saoLuuNguyetThienY);

    let viTriLuuNguyetHoaLoc,
      viTriLuuNguyetHoaQuyen,
      viTriLuuNguyetHoaKhoa,
      viTriLuuNguyetHoaKy; //
    switch (canLuuThang) {
      case 1:
        viTriLuuNguyetHoaLoc = viTriLiemTrinh;
        viTriLuuNguyetHoaQuyen = viTriPhaQuan;
        viTriLuuNguyetHoaKhoa = viTriVuKhuc;
        viTriLuuNguyetHoaKy = vitriThaiDuong;
        break;
      case 2:
        viTriLuuNguyetHoaLoc = viTriThienCo;
        viTriLuuNguyetHoaQuyen = viTriThienLuong;
        viTriLuuNguyetHoaKhoa = viTriTuVi;
        viTriLuuNguyetHoaKy = viTriThaiAm;
        break;
      case 3:
        viTriLuuNguyetHoaLoc = viTriThienDong;
        viTriLuuNguyetHoaQuyen = viTriThienCo;
        viTriLuuNguyetHoaKhoa = viTriVanXuong;
        viTriLuuNguyetHoaKy = viTriLiemTrinh;
        break;
      case 4:
        viTriLuuNguyetHoaLoc = viTriThaiAm;
        viTriLuuNguyetHoaQuyen = viTriThienDong;
        viTriLuuNguyetHoaKhoa = viTriThienCo;
        viTriLuuNguyetHoaKy = viTriCuMon;
        break;
      case 5:
        viTriLuuNguyetHoaLoc = viTriThamLang;
        viTriLuuNguyetHoaQuyen = viTriThaiAm;
        viTriLuuNguyetHoaKhoa = viTriHuuBat;
        viTriLuuNguyetHoaKy = viTriThienCo;
        break;
      case 6:
        viTriLuuNguyetHoaLoc = viTriVuKhuc;
        viTriLuuNguyetHoaQuyen = viTriThamLang;
        viTriLuuNguyetHoaKhoa = viTriThienLuong;
        viTriLuuNguyetHoaKy = viTriVanKhuc;
        break;
      case 7:
        viTriLuuNguyetHoaLoc = vitriThaiDuong;
        viTriLuuNguyetHoaQuyen = viTriVuKhuc;
        viTriLuuNguyetHoaKhoa = viTriThaiAm;
        viTriLuuNguyetHoaKy = viTriThienDong;
        break;
      case 8:
        viTriLuuNguyetHoaLoc = viTriCuMon;
        viTriLuuNguyetHoaQuyen = vitriThaiDuong;
        viTriLuuNguyetHoaKhoa = viTriVanKhuc;
        viTriLuuNguyetHoaKy = viTriVanXuong;
        break;
      case 9:
        viTriLuuNguyetHoaLoc = viTriThienLuong;
        viTriLuuNguyetHoaQuyen = viTriTuVi;
        viTriLuuNguyetHoaKhoa = viTriTaPhu;
        viTriLuuNguyetHoaKy = viTriVuKhuc;
        break;
      case 10:
        viTriLuuNguyetHoaLoc = viTriPhaQuan;
        viTriLuuNguyetHoaQuyen = viTriCuMon;
        viTriLuuNguyetHoaKhoa = viTriThaiAm;
        viTriLuuNguyetHoaKy = viTriThamLang;
        break;
    }
    diaBan.nhapSao(viTriLuuNguyetHoaLoc, saoLuuNguyetHoaLoc);
    diaBan.nhapSao(viTriLuuNguyetHoaQuyen, saoLuuNguyetHoaQuyen);
    diaBan.nhapSao(viTriLuuNguyetHoaKhoa, saoLuuNguyetHoaKhoa);
    diaBan.nhapSao(viTriLuuNguyetHoaKy, saoLuuNguyetHoaKy);
  }
  if (thangLuuNguyet === 12) {
    fs.writeFileSync("test.json", JSON.stringify(diaBan));
  }
  return diaBan;
}

module.exports = {
  lapLuuNguyet,
};
