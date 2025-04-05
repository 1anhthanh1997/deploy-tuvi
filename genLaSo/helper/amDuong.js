const { S2L, L2S, jdFromDate } = require("./handleTime.js");
const moment = require("moment");
const thienCan = [
  {
    id: 0,
    chuCaiDau: null,
    tenCan: null,
    nguHanh: null,
    nguHanhID: null,
    vitriDiaBan: null,
    amDuong: null,
  },
  {
    id: 1,
    chuCaiDau: "G",
    tenCan: "Giáp",
    nguHanh: "M",
    nguHanhID: 2,
    vitriDiaBan: 3,
    amDuong: 1,
  },
  {
    id: 2,
    chuCaiDau: "A",
    tenCan: "Ất",
    nguHanh: "M",
    nguHanhID: 2,
    vitriDiaBan: 4,
    amDuong: -1,
  },
  {
    id: 3,
    chuCaiDau: "B",
    tenCan: "Bính",
    nguHanh: "H",
    nguHanhID: 4,
    vitriDiaBan: 6,
    amDuong: 1,
  },
  {
    id: 4,
    chuCaiDau: "D",
    tenCan: "Đinh",
    nguHanh: "H",
    nguHanhID: 4,
    vitriDiaBan: 7,
    amDuong: -1,
  },
  {
    id: 5,
    chuCaiDau: "M",
    tenCan: "Mậu",
    nguHanh: "O",
    nguHanhID: 5,
    vitriDiaBan: 6,
    amDuong: 1,
  },
  {
    id: 6,
    chuCaiDau: "K",
    tenCan: "Kỷ",
    nguHanh: "O",
    nguHanhID: 5,
    vitriDiaBan: 7,
    amDuong: -1,
  },
  {
    id: 7,
    chuCaiDau: "C",
    tenCan: "Canh",
    nguHanh: "K",
    nguHanhID: 1,
    vitriDiaBan: 9,
    amDuong: 1,
  },
  {
    id: 8,
    chuCaiDau: "T",
    tenCan: "Tân",
    nguHanh: "K",
    nguHanhID: 1,
    vitriDiaBan: 10,
    amDuong: -1,
  },
  {
    id: 9,
    chuCaiDau: "N",
    tenCan: "Nhâm",
    nguHanh: "T",
    nguHanhID: 3,
    vitriDiaBan: 12,
    amDuong: 1,
  },
  {
    id: 10,
    chuCaiDau: "Q",
    tenCan: "Quý",
    nguHanh: "T",
    nguHanhID: 3,
    vitriDiaBan: 1,
    amDuong: -1,
  },
];

const diaChi = [
  { id: 0, tenChi: "Hem có", tenHanh: ":D", amDuong: 0 },
  {
    id: 1,
    tenChi: "Tý",
    tenHanh: "T",
    menhChu: "Tham lang",
    thanChu: "Linh tinh",
    amDuong: 1,
  },
  {
    id: 2,
    tenChi: "Sửu",
    tenHanh: "O",
    menhChu: "Cự môn",
    thanChu: "Thiên tướng",
    amDuong: -1,
  },
  {
    id: 3,
    tenChi: "Dần",
    tenHanh: "M",
    menhChu: "Lộc tồn",
    thanChu: "Thiên lương",
    amDuong: 1,
  },
  {
    id: 4,
    tenChi: "Mão",
    tenHanh: "M",
    menhChu: "Văn khúc",
    thanChu: "Thiên đồng",
    amDuong: -1,
  },
  {
    id: 5,
    tenChi: "Thìn",
    tenHanh: "O",
    menhChu: "Liêm trinh",
    thanChu: "Văn xương",
    amDuong: 1,
  },
  {
    id: 6,
    tenChi: "Tỵ",
    tenHanh: "H",
    menhChu: "Vũ khúc",
    thanChu: "Thiên cơ",
    amDuong: -1,
  },
  {
    id: 7,
    tenChi: "Ngọ",
    tenHanh: "H",
    menhChu: "Phá quân",
    thanChu: "Hỏa tinh",
    amDuong: 1,
  },
  {
    id: 8,
    tenChi: "Mùi",
    tenHanh: "O",
    menhChu: "Vũ khúc",
    thanChu: "Thiên tướng",
    amDuong: -1,
  },
  {
    id: 9,
    tenChi: "Thân",
    tenHanh: "K",
    menhChu: "Liêm trinh",
    thanChu: "Thiên lương",
    amDuong: 1,
  },
  {
    id: 10,
    tenChi: "Dậu",
    tenHanh: "K",
    menhChu: "Văn khúc",
    thanChu: "Thiên đồng",
    amDuong: -1,
  },
  {
    id: 11,
    tenChi: "Tuất",
    tenHanh: "O",
    menhChu: "Lộc tồn",
    thanChu: "Văn xương",
    amDuong: 1,
  },
  {
    id: 12,
    tenChi: "Hợi",
    tenHanh: "T",
    menhChu: "Cự môn",
    thanChu: "Thiên cơ",
    amDuong: -1,
  },
];

function ngayThangNam(nn = 15, tt = 5, nnnn, duongLich = true, timeZone = 7) {
  let thangNhuan = 0;
  if (nn > 0 && nn < 32 && tt < 13 && tt > 0) {
    if (duongLich) {
      [nn, tt, nnnn, thangNhuan] = S2L(nn, tt, nnnn, timeZone);
    } else {
      [nn, tt, nnnn] = L2S(nn, tt, nnnn, 0, timeZone);
    }
    return [nn, tt, nnnn, thangNhuan];
  } else {
    throw new Error("Ngày, tháng, năm không chính xác.");
  }
}

function canChiNgay(
  nn,
  tt,
  nnnn,
  duongLich = true,
  timeZone = 7,
  thangNhuan = false
) {
  if (!duongLich) {
    [nn, tt, nnnn] = L2S(nn, tt, nnnn, thangNhuan, timeZone);
  }
  let jd = jdFromDate(nn, tt, nnnn);
  let canNgay = ((jd + 9) % 10) + 1;
  let chiNgay = ((jd + 1) % 12) + 1;
  return [canNgay, chiNgay];
}

function canChiGio(canNgay, gio) {}

function ngayThangNamCanChi(
  nn = 15,
  tt = 5,
  nnnn,
  duongLich = true,
  timeZone = 7
) {
  let thangNhuan = 0;
  if (duongLich) {
    [nn, tt, nnnn, thangNhuan] = ngayThangNam(nn, tt, nnnn, timeZone);
  }
  let canThang = ((nnnn * 12 + tt + 3) % 10) + 1;
  let canNamSinh = ((nnnn + 6) % 10) + 1;
  let chiNam = ((nnnn + 8) % 12) + 1;
  return [canThang, canNamSinh, chiNam];
}

function nguHanh(tenHanh) {
  const hanhMap = {
    Kim: {
      id: 1,
      tenHanh: "Kim",
      cuc: 4,
      tenCuc: "Kim tứ Cục",
      css: "hanhKim",
    },
    K: { id: 1, tenHanh: "Kim", cuc: 4, tenCuc: "Kim tứ Cục", css: "hanhKim" },
    Moc: {
      id: 2,
      tenHanh: "Mộc",
      cuc: 3,
      tenCuc: "Mộc tam Cục",
      css: "hanhMoc",
    },
    M: { id: 2, tenHanh: "Mộc", cuc: 3, tenCuc: "Mộc tam Cục", css: "hanhMoc" },
    Thuy: {
      id: 3,
      tenHanh: "Thủy",
      cuc: 2,
      tenCuc: "Thủy nhị Cục",
      css: "hanhThuy",
    },
    T: {
      id: 3,
      tenHanh: "Thủy",
      cuc: 2,
      tenCuc: "Thủy nhị Cục",
      css: "hanhThuy",
    },
    Hoa: {
      id: 4,
      tenHanh: "Hỏa",
      cuc: 6,
      tenCuc: "Hỏa lục Cục",
      css: "hanhHoa",
    },
    H: { id: 4, tenHanh: "Hỏa", cuc: 6, tenCuc: "Hỏa lục Cục", css: "hanhHoa" },
    Tho: {
      id: 5,
      tenHanh: "Thổ",
      cuc: 5,
      tenCuc: "Thổ ngũ Cục",
      css: "hanhTho",
    },
    O: { id: 5, tenHanh: "Thổ", cuc: 5, tenCuc: "Thổ ngũ Cục", css: "hanhTho" },
  };
  if (hanhMap[tenHanh]) {
    return hanhMap[tenHanh];
  } else {
    throw new Error(
      "Tên Hành phải thuộc Kim (K), Mộc (M), Thủy (T), Hỏa (H) hoặc Thổ (O)"
    );
  }
}

function sinhKhac(hanh1, hanh2) {
  const matranSinhKhac = [
    [null, null, null, null, null, null],
    [null, 0, -1, 1, -1, 1],
    [null, -1, 0, 1, 1, -1],
    [null, 1, 1, 0, 1, -1],
    [null, -1, 1, -1, 0, 1],
    [null, 1, -1, -1, 1, 0],
  ];
  return matranSinhKhac[hanh1][hanh2];
}

function nguHanhNapAm(diaChi, thienCan, xuatBanMenh = false) {
  const banMenh = {
    K1: "HẢI TRUNG KIM",
    T1: "GIÁNG HẠ THỦY",
    H1: "TÍCH LỊCH HỎA",
    O1: "BÍCH THƯỢNG THỔ",
    M1: "TANG ÐỐ MỘC",
    T2: "ÐẠI KHÊ THỦY",
    H2: "LƯ TRUNG HỎA",
    O2: "THÀNH ÐẦU THỔ",
    M2: "TÒNG BÁ MỘC",
    K2: "KIM BẠCH KIM",
    H3: "PHÚ ÐĂNG HỎA",
    O3: "SA TRUNG THỔ",
    M3: "ÐẠI LÂM MỘC",
    K3: "BẠCH LẠP KIM",
    T3: "TRƯỜNG LƯU THỦY",
    K4: "SA TRUNG KIM",
    T4: "THIÊN HÀ THỦY",
    H4: "THIÊN THƯỢNG HỎA",
    O4: "LỘ BÀN THỔ",
    M4: "DƯƠNG LIỄU MỘC",
    T5: "TRUYỀN TRUNG THỦY",
    H5: "SƠN HẠ HỎA",
    O5: "ÐẠI TRẠCH THỔ",
    M5: "THẠCH LỰU MỘC",
    K5: "KIẾM PHONG KIM",
    H6: "SƠN ÐẦU HỎA",
    O6: "ỐC THƯỢNG THỔ",
    M6: "BÌNH ÐỊA MỘC",
    K6: "XOA XUYẾN KIM",
    T6: "ÐẠI HẢI THỦY",
  };

  const matranNapAm = [
    [0, "G", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "N", "Q"],
    [1, "K1", false, "T1", false, "H1", false, "O1", false, "M1", false],
    [2, false, "K1", false, "T1", false, "H1", false, "O1", false, "M1"],
    [3, "T2", false, "H2", false, "O2", false, "M2", false, "K2", false],
    [4, false, "T2", false, "H2", false, "O2", false, "M2", false, "K2"],
    [5, "H3", false, "O3", false, "M3", false, "K3", false, "T3", false],
    [6, false, "H3", false, "O3", false, "M3", false, "K3", false, "T3"],
    [7, "K4", false, "T4", false, "H4", false, "O4", false, "M4", false],
    [8, false, "K4", false, "T4", false, "H4", false, "O4", false, "M4"],
    [9, "T5", false, "H5", false, "O5", false, "M5", false, "K5", false],
    [10, false, "T5", false, "H5", false, "O5", false, "M5", false, "K5"],
    [11, "H6", false, "O6", false, "M6", false, "K6", false, "T6", false],
    [12, false, "H6", false, "O6", false, "M6", false, "K6", false, "T6"],
  ];

  try {
    const nh = matranNapAm[diaChi][thienCan];
    if (["K", "M", "T", "H", "O"].includes(nh[0])) {
      return xuatBanMenh ? banMenh[nh] : nh[0];
    }
  } catch (error) {
    throw new Error("Lỗi khi xác định ngũ hành nạp âm");
  }
}

function dichCung(cungBanDau, ...args) {
  let cungSauKhiDich = parseInt(cungBanDau, 10);
  for (const soCungDich of args) {
    cungSauKhiDich += parseInt(soCungDich, 10);
  }
  while (cungSauKhiDich <= 0) {
    cungSauKhiDich += 12;
  }
  return Math.abs(cungSauKhiDich) % 12 === 0
    ? 12
    : Math.abs(cungSauKhiDich) % 12;
}

function khoangCachCung(cung1, cung2, chieu = 1) {
  return chieu === 1 ? (cung1 - cung2 + 12) % 12 : (cung2 - cung1 + 12) % 12;
}

function timCuc(viTriCungMenhTrenDiaBan, canNamSinh) {
  let canThangGieng = (canNamSinh * 2 + 1) % 10;
  let kcCungMenhVaCungThangGieng =
    viTriCungMenhTrenDiaBan - 3 < 0
      ? viTriCungMenhTrenDiaBan - 3 + 12
      : viTriCungMenhTrenDiaBan - 3;
  let canThangMenh = ((kcCungMenhVaCungThangGieng % 12) + canThangGieng) % 10;
  if (canThangMenh === 0) {
    canThangMenh = 10;
  }
  return nguHanhNapAm(viTriCungMenhTrenDiaBan, canThangMenh);
}

function timTuVi(cuc, ngaySinhAmLich) {
  let cungDan = 3; // Vị trí cung Dần ban đầu là 3
  const cucBanDau = cuc;
  if (![2, 3, 4, 5, 6].includes(cuc)) {
    throw new Error("Số cục phải là 2, 3, 4, 5, 6");
  }
  while (cuc < ngaySinhAmLich) {
    cuc += cucBanDau;
    cungDan += 1;
  }
  let saiLech = cuc - ngaySinhAmLich;
  if (saiLech % 2 === 1) {
    saiLech = -saiLech;
  }
  return dichCung(cungDan, saiLech);
}

function timTrangSinh(cucSo) {
  switch (cucSo) {
    case 6:
      return 3; // Hỏa lục cục - Tràng sinh ở Dần
    case 4:
      return 6; // Kim tứ cục - Tràng sinh ở Tỵ
    case 2:
    case 5:
      return 9; // Thủy nhị cục, Thổ ngũ cục - Tràng sinh ở Thân
    case 3:
      return 12; // Mộc tam cục - Tràng sinh ở Hợi
    default:
      throw new Error("Không tìm được cung an sao Trường sinh");
  }
}

function timHoaLinh(chiNamSinh, gioSinh, gioiTinh, amDuongNamSinh) {
  let khoiCungHoaTinh, khoiCungLinhTinh;

  if ([3, 7, 11].includes(chiNamSinh)) {
    khoiCungHoaTinh = 2;
    khoiCungLinhTinh = 4;
  } else if ([1, 5, 9].includes(chiNamSinh)) {
    khoiCungHoaTinh = 3;
    khoiCungLinhTinh = 11;
  } else if ([6, 10, 2].includes(chiNamSinh)) {
    khoiCungHoaTinh = 4;
    khoiCungLinhTinh = 11;
  } else if ([12, 4, 8].includes(chiNamSinh)) {
    khoiCungHoaTinh = 10;
    khoiCungLinhTinh = 11;
  } else {
    throw new Error("Không thể khởi cung tìm Hỏa-Linh");
  }

  let viTriHoaTinh, viTriLinhTinh;

  if (gioiTinh * amDuongNamSinh === -1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh + 1, -gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh - 1, gioSinh);
  } else if (gioiTinh * amDuongNamSinh === 1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh - 1, gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh + 1, -gioSinh);
  }

  return [viTriHoaTinh, viTriLinhTinh];
}

function timThienKhoi(canNam) {
  const thienKhoi = [null, 2, 1, 12, 12, 2, 1, 7, 7, 4, 4];
  if (canNam >= 1 && canNam <= 10) {
    return thienKhoi[canNam];
  } else {
    throw new Error("Không tìm được vị trí Khôi-Việt");
  }
}

function timThienQuanThienPhuc(canNam) {
  const thienQuan = [null, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
  const thienPhuc = [null, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
  if (canNam >= 1 && canNam <= 10) {
    return [thienQuan[canNam], thienPhuc[canNam]];
  } else {
    throw new Error("Không tìm được Quan-Phúc");
  }
}

function timCoThan(chiNam) {
  if ([12, 1, 2].includes(chiNam)) {
    return 3;
  } else if ([3, 4, 5].includes(chiNam)) {
    return 6;
  } else if ([6, 7, 8].includes(chiNam)) {
    return 9;
  } else {
    return 12;
  }
}

function timThienMa(chiNam) {
  const demNghich = chiNam % 4;
  switch (demNghich) {
    case 1:
      return 3;
    case 2:
      return 12;
    case 3:
      return 9;
    case 0:
      return 6;
    default:
      throw new Error("Không tìm được Thiên mã");
  }
}

function timPhaToai(chiNam) {
  const demNghich = chiNam % 3;
  switch (demNghich) {
    case 0:
      return 6;
    case 1:
      return 10;
    case 2:
      return 2;
    default:
      throw new Error("Không tìm được Phá toái");
  }
}

function timTriet(canNam) {
  switch (canNam) {
    case 1:
    case 6:
      return [9, 10]; // Giáp Kỷ, Thân Dậu cung
    case 2:
    case 7:
      return [7, 8]; // Ất Canh, Ngọ Mùi cung
    case 3:
    case 8:
      return [5, 6]; // Bính Tân, Thìn Tị cung
    case 4:
    case 9:
      return [3, 4]; // Đinh Nhâm, Dần Mão cung
    case 5:
    case 10:
      return [1, 2]; // Mậu Quý, Tý Sửu cung
    default:
      throw new Error("Không tìm được Triệt");
  }
}

function timLuuTru(canNam) {
  const maTranLuuHa = [null, 10, 11, 7, 9, 1, 7, 4, 5, 12, 3];
  const maTranThienTru = [null, 6, 7, 1, 6, 7, 9, 3, 7, 10, 11];
  if (canNam >= 1 && canNam <= 10) {
    return [maTranLuuHa[canNam], maTranThienTru[canNam]];
  } else {
    throw new Error("Không tìm được Lưu - Trù");
  }
}

function getNextDay(ngaySinh, thangSinh, namSinh, duongLich) {
  if (!duongLich) {
    [ngaySinh, thangSinh, namSinh] = L2S(ngaySinh, thangSinh, namSinh, 0, 7);
  }
  const date = moment({ year: namSinh, month: thangSinh - 1, day: ngaySinh });
  const nextDay = date.add(1, "days");
  let ngay = nextDay.date();
  let thang = nextDay.month() + 1;
  let nam = nextDay.year();
  if (!duongLich) {
    [ngay, thang, nam] = S2L(ngay, thang, nam, 7);
  }
  return [ngay, thang, nam];
}

module.exports = {
  thienCan,
  diaChi,
  ngayThangNam,
  canChiNgay,
  canChiGio,
  ngayThangNamCanChi,
  nguHanh,
  sinhKhac,
  nguHanhNapAm,
  dichCung,
  khoangCachCung,
  timCuc,
  timTuVi,
  timTrangSinh,
  timHoaLinh,
  timThienKhoi,
  timThienQuanThienPhuc,
  timCoThan,
  timThienMa,
  timPhaToai,
  timTriet,
  timLuuTru,
  getNextDay,
};
