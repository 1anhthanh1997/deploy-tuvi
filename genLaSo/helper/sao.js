const { nguHanh } = require("./amDuong");

class Sao {
  /**
   * @param {number} saoID - 1, 2, ...
   * @param {string} saoTen - Tử vi, Tham lang,...
   * @param {string} saoNguHanh - K, M, T, H, O
   * @param {number} saoLoai - Sao tốt < 10, sau xấu > 10
   *                          1: Chính tinh, 2: Phụ tinh nói chung
   *                          3: Quý tinh, 4: Quyền tinh, 5: Phúc tinh, 6: Văn tinh
   *                          7: Đài các tinh, 8: Đào hoa tinh
   *                          11: Sát tinh, 12: Bại tinh, 13: Ám tinh, 14: Dâm tinh,
   *                          15: Hình tinh
   * @param {string} saoPhuongVi - Bắc Đẩu tinh, Nam Bắc Đẩu tinh
   * @param {string|number} saoAmDuong - Âm Dương của sao
   * @param {number} vongTrangSinh - 0/None: Không thuộc vòng Tràng sinh
   *                                1: Thuộc vòng Tràng sinh
   */
  constructor(
    saoID,
    saoTen,
    saoNguHanh,
    saoLoai = 2,
    saoPhuongVi = "",
    saoAmDuong = "",
    vongTrangSinh = 0,
    saoLuuNien = false
  ) {
    this.saoID = saoID;
    this.saoTen = saoTen;
    this.saoNguHanh = saoNguHanh;
    this.saoLoai = saoLoai;
    this.saoPhuongVi = saoPhuongVi;
    this.saoAmDuong = saoAmDuong;
    this.vongTrangSinh = vongTrangSinh;
    this.saoLuuNien = saoLuuNien;
    this.cssSao = nguHanh(saoNguHanh).css;
    this.saoDacTinh = null;
  }

  /**
   * An Đặc tính cho sao: V, M, Đ, B, H
   * @param {string} dacTinh - Đặc tính của sao, Vượng (V), Miếu (M),
   *                          Đắc (Đ), Bình (B), Hãm (H)
   * @returns {Sao} this
   */
  anDacTinh(dacTinh) {
    const dt = {
      V: "vuongDia",
      M: "mieuDia",
      Đ: "dacDia",
      B: "binhHoa",
      H: "hamDia",
    };
    this.saoDacTinh = dacTinh;
    // this.saoTen += " (" + dacTinh + ")";
    // this.cssSao = dt[dacTinh];
    return this;
  }

  /**
   * @param {number} saoViTriCung - Vị trí cung của sao
   * @returns {Sao} this
   */
  anCung(saoViTriCung) {
    this.saoViTriCung = saoViTriCung;
    return this;
  }
}

// Tử vi tinh hệ
const saoTuVi = new Sao(1, "The Master", "O", 1, "Đế tinh", 1, 0);
const saoLiemTrinh = new Sao(2, "The Executive", "H", 1, "Bắc đẩu tinh", 1, 0);
const saoThienDong = new Sao(3, "The Linker", "T", 1, "Bắc đẩu tinh", 1, 0);
const saoVuKhuc = new Sao(4, "The Capitalist", "K", 1, "Bắc đẩu tinh", -1, 0);
const saoThaiDuong = new Sao(5, "The Visionary", "H", 1, "Nam đẩu tinh", 1, 0);
const saoThienCo = new Sao(6, "The Thinker", "M", 1, "Nam đẩu tinh", -1, 0);

// Thiên phủ tinh hệ
const saoThienPhu = new Sao(7, "The Guardian", "O", 1, "Nam đẩu tinh", 1, 0);
const saoThaiAm = new Sao(8, "The Listener", "T", 1, "Bắc đẩu tinh", -1, 0);
const saoThamLang = new Sao(9, "The Seeker", "T", 1, "Bắc đẩu tinh", -1, 0);
const saoCuMon = new Sao(10, "The Disruptor", "T", 1, "Bắc đẩu tinh", -1, 0);
const saoThienTuong = new Sao(11, "The Hero", "T", 1, "Nam đẩu tinh", 1, 0);
const saoThienLuong = new Sao(
  12,
  "The Fortune-er",
  "M",
  1,
  "Nam đẩu tinh",
  -1,
  0
);
const saoThatSat = new Sao(13, "The Taker", "K", 1, "Nam đẩu tinh", 1, 0);
const saoPhaQuan = new Sao(14, "The Pioneer", "T", 1, "Bắc đẩu tinh", -1, 0);

// Vòng Địa chi - Thái tuế
const saoThaiTue = new Sao(15, "Real / Truth / Authentic", "H", 15, "", "");
const saoThieuDuong = new Sao(16, "Thiếu dương", "H", 5);
const saoTangMon = new Sao(17, "Plot / Bury", "M", 12);
const saoThieuAm = new Sao(18, "Thiếu âm", "T", 5);
const saoQuanPhu3 = new Sao(19, "Viewpoint", "H", 12);
const saoTuPhu = new Sao(20, "Tử phù", "K", 12);
const saoTuePha = new Sao(21, "Tuế phá", "H", 12);
const saoLongDuc = new Sao(22, "Long đức", "T", 5);
const saoBachHo = new Sao(23, "Tiger / Backbone", "K", 12);
const saoPhucDuc = new Sao(24, "Phúc đức", "O", 5);
const saoDieuKhach = new Sao(25, "Customer / Visitor/Wandering", "H", 12);
const saoTrucPhu = new Sao(26, "Trực phù", "K", 16);

//  Vòng Thiên can - Lộc tồn
const saoLocTon = new Sao(27, "Holdings", "O", 3, "Bắc đẩu tinh");
const saoBacSy = new Sao(109, "Bác sỹ", "T", 5);
const saoLucSi = new Sao(28, "Fortitude / Persevere", "H", 2);
const saoThanhLong = new Sao(29, "Cleanse", "T", 5);
const saoTieuHao = new Sao(30, "Small Depreciation", "H", 12);
const saoTuongQuan = new Sao(31, "Loyal", "M", 4);
const saoTauThu = new Sao(32, "Correspondence", "K", 3);
const saoPhiLiem = new Sao(33, "Split / Rush", "H", 2);
const saoHyThan = new Sao(34, "Inheritance / Gifted", "H", 5);
const saoBenhPhu = new Sao(35, "Sick / Shame", "O", 12);
const saoDaiHao = new Sao(36, "Great Depreciation", "H", 12);
const saoPhucBinh = new Sao(37, "Services / Return", "H", 13);
const saoQuanPhu2 = new Sao(38, "Officers", "H", 12);

// Vòng Tràng sinh
const saoTrangSinh = new Sao(39, "Tràng sinh", "T", 5, "", "", 1);
const saoMocDuc = new Sao(40, "Mộc dục", "T", 14, "", "", 1);
const saoQuanDoi = new Sao(41, "Quan đới", "K", 4, "", "", 1);
const saoLamQuan = new Sao(42, "Lâm quan", "K", 7, "", "", 1);
const saoDeVuong = new Sao(43, "Đế vượng", "K", 5, "", "", 1);
const saoSuy = new Sao(44, "Suy", "T", 12, "", "", 1);
const saoBenh = new Sao(45, "Bệnh", "H", 12, "", "", 1);
const saoTu = new Sao(46, "Tử", "H", 12, "", "", 1);
const saoMo = new Sao(47, "Mộ", "O", "", "", 1);
const saoTuyet = new Sao(48, "Tuyệt", "O", 12, "", "", 1);
const saoThai = new Sao(49, "Thai", "O", 14, "", "", 1);
const saoDuong = new Sao(50, "Dưỡng", "M", 2, "", "", 1);

// Lục sát
//    Kình dương đà la
const saoDaLa = new Sao(51, "Shield/Passive/Trap", "K", 11);
const saoKinhDuong = new Sao(52, "Spear/Active/Hit", "K", 11);

//    Địa không - Địa kiếp
const saoDiaKhong = new Sao(53, "Infinite/Unpredictable", "H", 11);
const saoDiaKiep = new Sao(54, "Disaster Star", "H", 11);

//    Hỏa tinh - Linh tinh
const saoLinhTinh = new Sao(55, "Lighting", "H", 11);
const saoHoaTinh = new Sao(56, "Fire", "H", 11);

// Sao Âm Dương
//    Văn xương - Văn khúc
const saoVanXuong = new Sao(57, "Literature/Straight", "K", 6);
const saoVanKhuc = new Sao(58, "Arts/Curve", "T", 6);

//    Thiên khôi - Thiên Việt
const saoThienKhoi = new Sao(59, "Max Point", "H", 6);
const saoThienViet = new Sao(60, "Starting Point", "H", 6);

//    Tả phù - Hữu bật
const saoTaPhu = new Sao(61, "Left Wing", "O", 2);
const saoHuuBat = new Sao(62, "Right Wing", "O", 2);

//    Long trì - Phượng các
const saoLongTri = new Sao(63, "Long trì", "T", 3);
const saoPhuongCac = new Sao(64, "Phoenix", "O", 3);

//    Tam thai - Bát tọa
const saoTamThai = new Sao(65, "Tam thai", "M", 7);
const saoBatToa = new Sao(66, "Bát tọa", "T", 7);

//    Ân quang - Thiên quý
const saoAnQuang = new Sao(67, "Ân quang", "M", 3);
const saoThienQuy = new Sao(68, "Thiên quý", "O", 3);

// Sao đôi khác
const saoThienKhoc = new Sao(69, "Tears", "T", 12);
const saoThienHu = new Sao(70, "Internet / Fake", "T", 12);
const saoThienDuc = new Sao(71, "Thiên đức", "H", 5);
const saoNguyetDuc = new Sao(72, "Nguyệt đức", "H", 5);
const saoThienHinh = new Sao(73, "Image/Clear", "H", 1);
const saoThienRieu = new Sao(74, "Pixelation/Blur", "T", 1);
const saoThienY = new Sao(75, "Chemical/Duplicate", "T", 1);
const saoQuocAn = new Sao(76, "Seal", "O", 6);
const saoDuongPhu = new Sao(77, "Advertisement", "M", 4);
const saoDaoHoa = new Sao(78, "Blossom / Love", "M", 8);
const saoHongLoan = new Sao(79, "Affinity / Intertwine", "T", 8);
const saoThienHy = new Sao(80, "Joyful", "T", 5);
const saoThienGiai = new Sao(81, "Thiên giải", "H", 5);
const saoDiaGiai = new Sao(82, "Địa giải", "O", 5);
const saoGiaiThan = new Sao(83, "Giải thần", "M", 5);
const saoThaiPhu = new Sao(84, "Thai phụ", "K", 6);
const saoPhongCao = new Sao(85, "Phong cáo", "O", 4);
const saoThienTai = new Sao(86, "Thiên tài", "O", 2);
const saoThienTho = new Sao(87, "Thiên thọ", "O", 5);
const saoThienThuong = new Sao(88, "Thiên thương", "O", 12);
const saoThienSu = new Sao(89, "Thiên sứ", "T", 12);
const saoThienLa = new Sao(90, "Thiên la", "O", 12);
const saoDiaVong = new Sao(91, "Địa võng", "O", 12);
const saoHoaKhoa = new Sao(92, "Fame Transformation", "T", 5);
const saoHoaQuyen = new Sao(93, "Authority Transformation", "T", 4);
const saoHoaLoc = new Sao(94, "Prosperity Transformation", "M", 3);
const saoHoaKy = new Sao(95, "Taboo Transformation", "T", 13);
const saoCoThan = new Sao(96, "Singularity", "O", 13);
const saoQuaTu = new Sao(97, "Withdraw", "O", 13);
const saoThienMa = new Sao(98, "Travel/Transportation", "H", 3);
const saoPhaToai = new Sao(99, "Phá toái", "H", 12);
const saoThienQuan = new Sao(100, "Thiên quan", "H", 5);
const saoThienPhuc = new Sao(101, "Thiên phúc", "H", 5);
const saoLuuHa = new Sao(102, "Flow", "T", 12);
const saoThienTru = new Sao(103, "Thiên trù", "O", 5);
const saoKiepSat = new Sao(104, "Kiếp sát", "H", 11);
const saoHoaCai = new Sao(105, "Favor / Indulge", "K", 14);
const saoVanTinh = new Sao(106, "Văn tinh", "H", 6);
const saoDauQuan = new Sao(107, "Đẩu quân", "H", 5);
// const saoThienKhong = new Sao(108, "Thiên không", "T", 11);
const saoLuuThaiTue = new Sao(109, "Y.Thái tuế", "H", 15, "", "", 0, true);
const saoLuuTangMon = new Sao(110, "Y.Tang môn", "M", 12, "", "", 0, true);
const saoLuuBachHo = new Sao(111, "Y.Bạch hổ", "K", 12, "", "", 0, true);
const saoLuuLocTon = new Sao(
  112,
  "Y.Lộc tồn",
  "O",
  3,
  "Bắc đẩu tinh",
  "",
  0,
  true
);
const saoLuuKinhDuong = new Sao(113, "Y.Kình dương", "K", 11, "", "", 0, true);
const saoLuuDaLa = new Sao(114, "Y.Đà la", "K", 11, "", "", 0, true);
const saoLuuThienMa = new Sao(115, "Y.Thiên mã", "H", 3, "", "", 0, true);
const saoLuuThienKhoc = new Sao(116, "Y.Thiên khốc", "T", 12, "", "", 0, true);
const saoLuuThienHu = new Sao(117, "Y.Thiên hư", "T", 12, "", "", 0, true);
const saoLuuThienKhoi = new Sao(118, "Y.Thiên khôi", "H", 6, "", "", 0, true);
const saoLuuThienViet = new Sao(119, "Y.Thiên việt", "H", 6, "", "", 0, true);
const saoLuuDaoHoa = new Sao(120, "Y.Đào hoa", "M", 8, "", "", 0, true);
const saoLuuHongLoan = new Sao(121, "Y.Hồng loan", "T", 8, "", "", 0, true);
const saoLuuHoaKhoa = new Sao(122, "Y.Hóa khoa", "T", 5, "", "", 0, true);
const saoLuuHoaQuyen = new Sao(123, "Y.Hóa quyền", "T", 4, "", "", 0, true);
const saoLuuHoaLoc = new Sao(124, "Y.Hóa lộc", "M", 3, "", "", 0, true);
const saoLuuHoaKy = new Sao(125, "Y.Hóa kỵ", "T", 13, "", "", 0, true);
const saoLuuPhuongCac = new Sao(126, "Y.Phượng các", "O", 3, "", "", 0, true);
const saoLuuTuongQuan = new Sao(127, "Y.Tướng quân", "M", 4, "", "", 0, true);
const saoLuuTauThu = new Sao(128, "Y.Tấu thư", "K", 3, "", "", 0, true);
const saoLuuDuongPhu = new Sao(129, "Y.Đường phù", "M", 4, "", "", 0, true);
const saoLuuQuanPhu3 = new Sao(130, "Y.Quan phù", "H", 12, "", "", 0, true);
const saoLuuPhiLiem = new Sao(131, "Y.Phi liêm", "H", 2, "", "", 0, true);
const saoLuuHyThan = new Sao(132, "Y.Hỷ thần", "H", 5, "", "", 0, true);
const saoLuuLuuHa = new Sao(133, "Y.Lưu hà", "T", 12, "", "", 0, true);
const saoLuuQuocAn = new Sao(134, "Y.Quốc ấn", "O", 6, "", "", 0, true);
const saoLuuBenhPhu = new Sao(135, "Y.Bệnh phù", "O", 12, "", "", 0, true);
const saoLuuDaiHao = new Sao(136, "Y.Đại hao", "H", 12, "", "", 0, true);
const saoLuuPhucBinh = new Sao(137, "Y.Phục binh", "H", 13, "", "", 0, true);
const saoLuuQuaTu = new Sao(138, "Y.Quả tú", "O", 13, "", "", 0, true);
const saoLuuQuanPhu2 = new Sao(139, "Y.Quan phủ", "H", 12, "", "", 0, true);
const saoLuuDieuKhach = new Sao(140, "Y.Điếu khách", "H", 12, "", "", 0, true);
const saoLuuLucSi = new Sao(141, "Y.Lực sĩ", "H", 2, "", "", 0, true);
const saoLuuThanhLong = new Sao(142, "Y.Thanh long", "T", 5, "", "", 0, true);
const saoLuuHoaCai = new Sao(143, "Y.Hoa cái", "K", 14, "", "", 0, true);
const saoLuuThienHy = new Sao(144, "Y.Thiên hỷ", "T", 5, "", "", 0, true);
const saoLuuTieuHao = new Sao(145, "Y.Tiểu hao", "H", 12, "", "", 0, true);
const saoLuuCoThan = new Sao(146, "Y.Cô thần", "O", 13, "", "", 0, true);
const saoLuuNguyetTaPhu = new Sao(147, "M.Tả phù", "O", 2, "", "", 0, true);
const saoLuuNguyetHuuBat = new Sao(148, "M.Hữu bật", "O", 2, "", "", 0, true);
const saoLuuNguyetVanXuong = new Sao(
  149,
  "M.Văn xương",
  "K",
  6,
  "",
  "",
  0,
  true
);
const saoLuuNguyetVanKhuc = new Sao(150, "M.Văn khúc", "T", 6, "", "", 0, true);
const saoLuuNguyetThienHinh = new Sao(
  151,
  "M.Thiên hình",
  "H",
  15,
  "",
  "",
  0,
  true
);
const saoLuuNguyetThienRieu = new Sao(
  152,
  "M.Thiên diêu",
  "T",
  13,
  "",
  "",
  0,
  true
);
const saoLuuNguyetThienY = new Sao(
  153,
  "M.Thiên y",
  "T",
  1,
  5,
  "",
  "",
  0,
  true
);
const saoLuuNguyetHoaKhoa = new Sao(154, "M.Hóa khoa", "T", 5, "", "", 0, true);
const saoLuuNguyetHoaQuyen = new Sao(
  155,
  "M.Hóa quyền",
  "T",
  4,
  "",
  "",
  0,
  true
);
const saoLuuNguyetHoaLoc = new Sao(156, "M.Hóa lộc", "M", 3, "", "", 0, true);
const saoLuuNguyetHoaKy = new Sao(157, "M.Hóa kỵ", "T", 13, "", "", 0, true);
const saoLuuNhatHoaKhoa = new Sao(158, "D.Hóa khoa", "T", 5, "", "", 0, true);
const saoLuuNhatHoaQuyen = new Sao(159, "D.Hóa quyền", "T", 4, "", "", 0, true);
const saoLuuNhatHoaLoc = new Sao(160, "D.Hóa lộc", "M", 3, "", "", 0, true);
const saoLuuNhatHoaKy = new Sao(161, "D.Hóa kỵ", "T", 13, "", "", 0, true);

module.exports = {
  Sao,
  saoTuVi,
  saoLiemTrinh,
  saoThienDong,
  saoVuKhuc,
  saoThaiDuong,
  saoThienCo,
  saoThienPhu,
  saoThaiAm,
  saoThamLang,
  saoCuMon,
  saoThienTuong,
  saoThienLuong,
  saoThatSat,
  saoPhaQuan,
  saoThaiTue,
  saoThieuDuong,
  saoTangMon,
  saoThieuAm,
  saoQuanPhu3,
  saoTuPhu,
  saoTuePha,
  saoLongDuc,
  saoBachHo,
  saoPhucDuc,
  saoDieuKhach,
  saoTrucPhu,
  saoLocTon,
  saoBacSy,
  saoLucSi,
  saoThanhLong,
  saoTieuHao,
  saoTuongQuan,
  saoTauThu,
  saoPhiLiem,
  saoHyThan,
  saoBenhPhu,
  saoDaiHao,
  saoPhucBinh,
  saoQuanPhu2,
  saoTrangSinh,
  saoMocDuc,
  saoQuanDoi,
  saoLamQuan,
  saoDeVuong,
  saoSuy,
  saoBenh,
  saoTu,
  saoMo,
  saoTuyet,
  saoThai,
  saoDuong,
  saoDaLa,
  saoKinhDuong,
  saoDiaKhong,
  saoDiaKiep,
  saoLinhTinh,
  saoHoaTinh,
  saoVanXuong,
  saoVanKhuc,
  saoThienKhoi,
  saoThienViet,
  saoTaPhu,
  saoHuuBat,
  saoLongTri,
  saoPhuongCac,
  saoTamThai,
  saoBatToa,
  saoAnQuang,
  saoThienQuy,
  saoThienKhoc,
  saoThienHu,
  saoThienDuc,
  saoNguyetDuc,
  saoThienHinh,
  saoThienRieu,
  saoThienY,
  saoQuocAn,
  saoDuongPhu,
  saoDaoHoa,
  saoHongLoan,
  saoThienHy,
  saoThienGiai,
  saoDiaGiai,
  saoGiaiThan,
  saoThaiPhu,
  saoPhongCao,
  saoThienTai,
  saoThienTho,
  saoThienThuong,
  saoThienSu,
  saoThienLa,
  saoDiaVong,
  saoHoaKhoa,
  saoHoaQuyen,
  saoHoaLoc,
  saoHoaKy,
  saoCoThan,
  saoQuaTu,
  saoThienMa,
  saoPhaToai,
  saoThienQuan,
  saoThienPhuc,
  saoLuuHa,
  saoThienTru,
  saoKiepSat,
  saoHoaCai,
  saoVanTinh,
  saoDauQuan,
  // saoThienKhong,
  saoLuuThaiTue,
  saoLuuTangMon,
  saoLuuBachHo,
  saoLuuLocTon,
  saoLuuKinhDuong,
  saoLuuDaLa,
  saoLuuThienMa,
  saoLuuThienKhoc,
  saoLuuThienHu,
  saoLuuThienKhoi,
  saoLuuThienViet,
  saoLuuDaoHoa,
  saoLuuHongLoan,
  saoLuuHoaKhoa,
  saoLuuHoaQuyen,
  saoLuuHoaLoc,
  saoLuuHoaKy,
  saoLuuPhuongCac,
  saoLuuTuongQuan,
  saoLuuTauThu,
  saoLuuDuongPhu,
  saoLuuQuanPhu3,
  saoLuuPhiLiem,
  saoLuuHyThan,
  saoLuuLuuHa,
  saoLuuQuocAn,
  saoLuuBenhPhu,
  saoLuuDaiHao,
  saoLuuPhucBinh,
  saoLuuQuaTu,
  saoLuuQuanPhu2,
  saoLuuDieuKhach,
  saoLuuLucSi,
  saoLuuThanhLong,
  saoLuuHoaCai,
  saoLuuThienHy,
  saoLuuTieuHao,
  saoLuuCoThan,
  saoLuuNguyetTaPhu,
  saoLuuNguyetHuuBat,
  saoLuuNguyetVanXuong,
  saoLuuNguyetVanKhuc,
  saoLuuNguyetThienHinh,
  saoLuuNguyetThienRieu,
  saoLuuNguyetHoaKhoa,
  saoLuuNguyetHoaQuyen,
  saoLuuNguyetHoaLoc,
  saoLuuNguyetHoaKy,
  saoLuuNhatHoaKhoa,
  saoLuuNhatHoaQuyen,
  saoLuuNhatHoaLoc,
  saoLuuNhatHoaKy,
  saoLuuNguyetThienY,
};
