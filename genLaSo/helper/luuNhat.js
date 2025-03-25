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
  saoQuanPhu2,
  saoQuanPhu3,
  saoTangMon,
  saoTaPhu,
  saoTauThu,
  saoThaiAm,
  saoThaiDuong,
  saoThaiTue,
  saoThamLang,
  saoThanhLong,
  saoThatSat,
  saoThienCo,
  saoThienDong,
  saoThienLuong,
  saoThienMa,
  saoThienPhu,
  saoThienTuong,
  saoTieuHao,
  saoTuongQuan,
  saoTuVi,
  saoVanKhuc,
  saoVanXuong,
  saoVuKhuc,
  saoLuuNhatHoaLoc,
  saoLuuNhatHoaQuyen,
  saoLuuNhatHoaKhoa,
  saoLuuNhatHoaKy,
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
function lapLuuNhat(
  DiaBan,
  nn,
  tt,
  nnnn,
  gioSinh,
  gioiTinh,
  duongLich,
  timeZone,
  namXemTieuVan,
  thangLuuNguyet = 1,
  canLuuNgay
) {
  let canThang, canNam, chiNam, thangNhuan, canLuuThang, canLuuNam, chiLuuNam;

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

  [canLuuThang, canLuuNam, chiLuuNam] = ngayThangNamCanChi(
    5,
    thangLuuNguyet,
    namXemTieuVan,
    false,
    timeZone
  );

  diaBan = new DiaBan(tt, gioSinh);

  const amDuongNamSinh = thienCan[canNam].amDuong;
  const amDuongChiNamSinh = diaChi[chiNam].amDuong;

  // Bản Mệnh chính là Ngũ hành nạp âm của năm sinh
  // const banMenh = nguHanhNapAm(canNam, chiNam);

  const hanhCuc = timCuc(diaBan.cungMenh, canNam);
  const cuc = nguHanh(hanhCuc);
  const cucSo = cuc.cuc;

  // Nhập đại hạn khi đã biết được số cục
  // Theo sách Số tử vi dưới góc nhìn khoa học
  // Dương Nam - Âm Nữ theo chiều thuận
  // Âm Nam - Dương Nữ theo chiều nghịch
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

  if (canLuuNgay) {
    const viTriTaPhu = dichCung(5, thangLuuNguyet - 1);

    const viTriHuuBat = dichCung(2, 2 - viTriTaPhu);

    const viTriVanKhuc = dichCung(5, gioSinh - 1);

    const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc);

    if (canLuuNgay) {
      let viTriLuuNhatHoaLoc,
        viTriLuuNhatHoaQuyen,
        viTriLuuNhatHoaKhoa,
        viTriLuuNhatHoaKy; //

      switch (canLuuNgay) {
        case 1:
          viTriLuuNhatHoaLoc = viTriLiemTrinh;
          viTriLuuNhatHoaQuyen = viTriPhaQuan;
          viTriLuuNhatHoaKhoa = viTriVuKhuc;
          viTriLuuNhatHoaKy = vitriThaiDuong;
          break;
        case 2:
          viTriLuuNhatHoaLoc = viTriThienCo;
          viTriLuuNhatHoaQuyen = viTriThienLuong;
          viTriLuuNhatHoaKhoa = viTriTuVi;
          viTriLuuNhatHoaKy = viTriThaiAm;
          break;
        case 3:
          viTriLuuNhatHoaLoc = viTriThienDong;
          viTriLuuNhatHoaQuyen = viTriThienCo;
          viTriLuuNhatHoaKhoa = viTriVanXuong;
          viTriLuuNhatHoaKy = viTriLiemTrinh;
          break;
        case 4:
          viTriLuuNhatHoaLoc = viTriThaiAm;
          viTriLuuNhatHoaQuyen = viTriThienDong;
          viTriLuuNhatHoaKhoa = viTriThienCo;
          viTriLuuNhatHoaKy = viTriCuMon;
          break;
        case 5:
          viTriLuuNhatHoaLoc = viTriThamLang;
          viTriLuuNhatHoaQuyen = viTriThaiAm;
          viTriLuuNhatHoaKhoa = viTriHuuBat;
          viTriLuuNhatHoaKy = viTriThienCo;
          break;
        case 6:
          viTriLuuNhatHoaLoc = viTriVuKhuc;
          viTriLuuNhatHoaQuyen = viTriThamLang;
          viTriLuuNhatHoaKhoa = viTriThienLuong;
          viTriLuuNhatHoaKy = viTriVanKhuc;
          break;
        case 7:
          viTriLuuNhatHoaLoc = vitriThaiDuong;
          viTriLuuNhatHoaQuyen = viTriVuKhuc;
          viTriLuuNhatHoaKhoa = viTriThaiAm;
          viTriLuuNhatHoaKy = viTriThienDong;
          break;
        case 8:
          viTriLuuNhatHoaLoc = viTriCuMon;
          viTriLuuNhatHoaQuyen = vitriThaiDuong;
          viTriLuuNhatHoaKhoa = viTriVanKhuc;
          viTriLuuNhatHoaKy = viTriVanXuong;
          break;
        case 9:
          viTriLuuNhatHoaLoc = viTriThienLuong;
          viTriLuuNhatHoaQuyen = viTriTuVi;
          viTriLuuNhatHoaKhoa = viTriTaPhu;
          viTriLuuNhatHoaKy = viTriVuKhuc;
          break;
        case 10:
          viTriLuuNhatHoaLoc = viTriPhaQuan;
          viTriLuuNhatHoaQuyen = viTriCuMon;
          viTriLuuNhatHoaKhoa = viTriThaiAm;
          viTriLuuNhatHoaKy = viTriThamLang;
          break;
      }
      diaBan.nhapSao(viTriLuuNhatHoaLoc, saoLuuNhatHoaLoc);
      diaBan.nhapSao(viTriLuuNhatHoaQuyen, saoLuuNhatHoaQuyen);
      diaBan.nhapSao(viTriLuuNhatHoaKhoa, saoLuuNhatHoaKhoa);
      diaBan.nhapSao(viTriLuuNhatHoaKy, saoLuuNhatHoaKy);
    }
  }

  return diaBan;
}

module.exports = {
  lapLuuNhat,
};
