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
    saoTenEn,
    saoNguHanh,
    saoLoai = 2,
    saoPhuongVi = "",
    saoAmDuong = "",
    vongTrangSinh = 0,
    saoLuuNien = false
  ) {
    this.saoID = saoID;
    this.saoTen = saoTen;
    this.saoTenEn = saoTenEn;
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
const saoTuVi = new Sao(1, "Tử vi", "The Master", "O", 1, "Đế tinh", 1, 0);
const saoLiemTrinh = new Sao(
  2,
  "Liêm trinh",
  "The Executive",
  "H",
  1,
  "Bắc đẩu tinh",
  1,
  0
);
const saoThienDong = new Sao(
  3,
  "Thiên đồng",
  "The Linker",
  "T",
  1,
  "Bắc đẩu tinh",
  1,
  0
);

const saoVuKhuc = new Sao(
  4,
  "Vũ khúc",
  "The Capitalist",
  "K",
  1,
  "Bắc đẩu tinh",
  -1,
  0
);
const saoThaiDuong = new Sao(
  5,
  "Thái dương",
  "The Visionary",
  "H",
  1,
  "Nam đẩu tinh",
  1,
  0
);
const saoThienCo = new Sao(
  6,
  "Thiên cơ",
  "The Thinker",
  "M",
  1,
  "Nam đẩu tinh",
  -1,
  0
);

// Thiên phủ tinh hệ
const saoThienPhu = new Sao(
  7,
  "Thiên phủ",
  "The Guardian",
  "O",
  1,
  "Nam đẩu tinh",
  1,
  0
);
const saoThaiAm = new Sao(
  8,
  "Thái âm",
  "The Listener",
  "T",
  1,
  "Bắc đẩu tinh",
  -1,
  0
);
const saoThamLang = new Sao(
  9,
  "Tham lang",
  "The Seeker",
  "T",
  1,
  "Bắc đẩu tinh",
  -1,
  0
);
const saoCuMon = new Sao(
  10,
  "Cự môn",
  "The Disruptor",
  "T",
  1,
  "Bắc đẩu tinh",
  -1,
  0
);
const saoThienTuong = new Sao(
  11,
  "Thiên tướng",
  "The Hero",
  "T",
  1,
  "Nam đẩu tinh",
  1,
  0
);
const saoThienLuong = new Sao(
  12,
  "Thiên lương",
  "The Fortune-er",
  "M",
  1,
  "Nam đẩu tinh",
  -1,
  0
);
const saoThatSat = new Sao(
  13,
  "Thất sát",
  "The Taker",
  "K",
  1,
  "Nam đẩu tinh",
  1,
  0
);
const saoPhaQuan = new Sao(
  14,
  "Phá quân",
  "The Pioneer",
  "T",
  1,
  "Bắc đẩu tinh",
  -1,
  0
);

// Vòng Địa chi - Thái tuế
const saoThaiTue = new Sao(
  15,
  "Thái tuế",
  "Real / Truth / Authentic",
  "H",
  15,
  "",
  ""
);
const saoThieuDuong = new Sao(16, "Thiếu dương", "", "H", 5);
const saoTangMon = new Sao(17, "Tang môn", "Plot / Bury", "M", 12);
const saoThieuAm = new Sao(18, "Thiếu âm", "", "T", 5);
const saoQuanPhu3 = new Sao(19, "Quan phù", "Viewpoint", "H", 12);
const saoTuPhu = new Sao(20, "Tử phù", "", "K", 12);
const saoTuePha = new Sao(21, "Tuế phá", "", "H", 12);
const saoLongDuc = new Sao(22, "Long đức", "", "T", 5);
const saoBachHo = new Sao(23, "Bạch hổ", "Tiger / Backbone", "K", 12);
const saoPhucDuc = new Sao(24, "Phúc đức", "", "O", 5);
const saoDieuKhach = new Sao(
  25,
  "Điếu khách",
  "Customer / Visitor/Wandering",
  "H",
  12
);
const saoTrucPhu = new Sao(26, "Trực phù", "", "K", 16);

//  Vòng Thiên can - Lộc tồn
const saoLocTon = new Sao(27, "Lộc tồn", "Holdings", "O", 3, "Bắc đẩu tinh");
const saoBacSy = new Sao(109, "Bác sỹ", "", "T", 5);
const saoLucSi = new Sao(28, "Lực sĩ", "Fortitude / Persevere", "H", 2);
const saoThanhLong = new Sao(29, "Thanh long", "Cleanse", "T", 5);
const saoTieuHao = new Sao(30, "Tiểu hao", "Micro Economic", "H", 12);
const saoTuongQuan = new Sao(31, "Tướng quân", "Loyal", "M", 4);
const saoTauThu = new Sao(32, "Tấu thư", "Correspondence", "K", 3);
const saoPhiLiem = new Sao(33, "Phi liêm", "Split / Rush", "H", 2);
const saoHyThan = new Sao(34, "Hỷ thần", "Inheritance / Gifted", "H", 5);
const saoBenhPhu = new Sao(35, "Bệnh phù", "Sick / Shame", "O", 12);
const saoDaiHao = new Sao(36, "Đại hao", "Macro Economic", "H", 12);
const saoPhucBinh = new Sao(37, "Phục binh", "Services / Return", "H", 13);
const saoQuanPhu2 = new Sao(38, "Quan phủ", "Officers", "H", 12);

// Vòng Tràng sinh
const saoTrangSinh = new Sao(39, "Tràng sinh", "", "T", 5, "", "", 1);
const saoMocDuc = new Sao(40, "Mộc dục", "", "T", 14, "", "", 1);
const saoQuanDoi = new Sao(41, "Quan đới", "", "K", 4, "", "", 1);
const saoLamQuan = new Sao(42, "Lâm quan", "", "K", 7, "", "", 1);
const saoDeVuong = new Sao(43, "Đế vượng", "", "K", 5, "", "", 1);
const saoSuy = new Sao(44, "Suy", "", "T", 12, "", "", 1);
const saoBenh = new Sao(45, "Bệnh", "", "H", 12, "", "", 1);
const saoTu = new Sao(46, "Tử", "", "H", 12, "", "", 1);
const saoMo = new Sao(47, "Mộ", "", "O", "", "", 1);
const saoTuyet = new Sao(48, "Tuyệt", "", "O", 12, "", "", 1);
const saoThai = new Sao(49, "Thai", "", "O", 14, "", "", 1);
const saoDuong = new Sao(50, "Dưỡng", "", "M", 2, "", "", 1);

// Lục sát
//    Kình dương đà la
const saoDaLa = new Sao(51, "Đà la", "Shield/Passive/Trap", "K", 11);
const saoKinhDuong = new Sao(52, "Kình dương", "Spear/Active/Hit", "K", 11);

//    Địa không - Địa kiếp
const saoDiaKhong = new Sao(53, "Địa không", "Black Swan", "H", 11);
const saoDiaKiep = new Sao(54, "Địa kiếp", "Disaster Star", "H", 11);

//    Hỏa tinh - Linh tinh
const saoLinhTinh = new Sao(55, "Linh tinh", "Lighting", "H", 11);
const saoHoaTinh = new Sao(56, "Hỏa tinh", "Fire", "H", 11);

// Sao Âm Dương
//    Văn xương - Văn khúc
const saoVanXuong = new Sao(57, "Văn xương", "Literature/Straight", "K", 6);
const saoVanKhuc = new Sao(58, "Văn khúc", "Arts/Curve", "T", 6);

//    Thiên khôi - Thiên Việt
const saoThienKhoi = new Sao(59, "Thiên khôi", "Max Point", "H", 6);
const saoThienViet = new Sao(60, "Thiên việt", "Starting Point", "H", 6);

//    Tả phù - Hữu bật
const saoTaPhu = new Sao(61, "Tả phù", "Left Wing", "O", 2);
const saoHuuBat = new Sao(62, "Hữu bật", "Right Wing", "O", 2);

//    Long trì - Phượng các
const saoLongTri = new Sao(63, "Long trì", "", "T", 3);
const saoPhuongCac = new Sao(64, "Phượng các", "Phoenix", "O", 3);

//    Tam thai - Bát tọa
const saoTamThai = new Sao(65, "Tam thai", "", "M", 7);
const saoBatToa = new Sao(66, "Bát tọa", "", "T", 7);

//    Ân quang - Thiên quý
const saoAnQuang = new Sao(67, "Ân quang", "", "M", 3);
const saoThienQuy = new Sao(68, "Thiên quý", "", "O", 3);

// Sao đôi khác
const saoThienKhoc = new Sao(69, "Thiên khốc", "Tears", "T", 12);
const saoThienHu = new Sao(70, "Thiên hư", "Internet / Fake", "T", 12);
const saoThienDuc = new Sao(71, "Thiên đức", "", "H", 5);
const saoNguyetDuc = new Sao(72, "Nguyệt đức", "", "H", 5);
const saoThienHinh = new Sao(73, "Thiên hình", "Image/Clear", "H", 1);
const saoThienRieu = new Sao(74, "Thiên diêu", "Pixelation/Blur", "T", 1);
const saoThienY = new Sao(75, "Thiên y", "Chemical/Duplicate", "T", 1);
const saoQuocAn = new Sao(76, "Quốc ấn", "Seal", "O", 6);
const saoDuongPhu = new Sao(77, "Đường phù", "Advertisement", "M", 4);
const saoDaoHoa = new Sao(78, "Đào hoa", "Blossom / Love", "M", 8);
const saoHongLoan = new Sao(79, "Hồng loan", "Affinity / Intertwine", "T", 8);
const saoThienHy = new Sao(80, "Thiên hỷ", "Joyful", "T", 5);
const saoThienGiai = new Sao(81, "Thiên giải", "", "H", 5);
const saoDiaGiai = new Sao(82, "Địa giải", "", "O", 5);
const saoGiaiThan = new Sao(83, "Giải thần", "", "M", 5);
const saoThaiPhu = new Sao(84, "Thai phụ", "", "K", 6);
const saoPhongCao = new Sao(85, "Phong cáo", "", "O", 4);
const saoThienTai = new Sao(86, "Thiên tài", "", "O", 2);
const saoThienTho = new Sao(87, "Thiên thọ", "", "O", 5);
const saoThienThuong = new Sao(88, "Thiên thương", "", "O", 12);
const saoThienSu = new Sao(89, "Thiên sứ", "", "T", 12);
const saoThienLa = new Sao(90, "Thiên la", "", "O", 12);
const saoDiaVong = new Sao(91, "Địa võng", "", "O", 12);
const saoHoaKhoa = new Sao(92, "Hoá khoa", "Fame Transformation", "T", 5);
const saoHoaQuyen = new Sao(
  93,
  "Hoá quyền",
  "Authority Transformation",
  "T",
  4
);
const saoHoaLoc = new Sao(94, "Hoá lộc", "Prosperity Transformation", "M", 3);
const saoHoaKy = new Sao(95, "Hoá kỵ", "Taboo Transformation", "T", 13);
const saoCoThan = new Sao(96, "Cô thần", "Singularity", "O", 13);
const saoQuaTu = new Sao(97, "Quả tú", "Withdraw", "O", 13);
const saoThienMa = new Sao(98, "Thiên mã", "Travel/Transportation", "H", 3);
const saoPhaToai = new Sao(99, "Phá toái", "", "H", 12);
const saoThienQuan = new Sao(100, "Thiên quan", "", "H", 5);
const saoThienPhuc = new Sao(101, "Thiên phúc", "", "H", 5);
const saoLuuHa = new Sao(102, "Lưu hà", "Flow", "T", 12);
const saoThienTru = new Sao(103, "Thiên trù", "", "O", 5);
const saoKiepSat = new Sao(104, "Kiếp sát", "", "H", 11);
const saoHoaCai = new Sao(105, "Hoa cái", "Favor / Indulge", "K", 14);
const saoVanTinh = new Sao(106, "Văn tinh", "", "H", 6);
const saoDauQuan = new Sao(107, "Đẩu quân", "", "H", 5);
// const saoThienKhong = new Sao(108, "Thiên không", "T", 11);

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
};
