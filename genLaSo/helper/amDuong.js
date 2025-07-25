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
    [null, 0, 2, 1, 2, 1],
    [null, -2, 0, 1, 1, -2],
    [null, -1, -1, 0, 1, 2],
    [null, -2, -1, -1, 0, 1],
    [null, -1, 2, 2, -1, 0],
  ];
  return matranSinhKhac[hanh1][hanh2];
}

function nguHanhNapAm(diaChi, thienCan, xuatBanMenh = false) {
  const banMenh = {
    K1: "HẢI TRUNG KIM",
    T1: "GIẢN HẠ THỦY",
    H1: "TÍCH LỊCH HỎA",
    O1: "BÍCH THƯỢNG THỔ",
    M1: "TĂNG ÐỐ MỘC",
    T2: "ÐẠI KHÊ THỦY",
    H2: "LƯ TRUNG HỎA",
    O2: "THÀNH ÐẦU THỔ",
    M2: "TÙNG BÁCH MỘC",
    K2: "KIM BẠCH KIM",
    H3: "PHÚ ÐĂNG HỎA",
    O3: "SA TRUNG THỔ",
    M3: "ÐẠI LÂM MỘC",
    K3: "BẠCH LẠP KIM",
    T3: "TRƯỜNG LƯU THỦY",
    K4: "SA TRUNG KIM",
    T4: "THIÊN HÀ THỦY",
    H4: "THIÊN THƯỢNG HỎA",
    O4: "LỘ BÀNG THỔ",
    M4: "DƯƠNG LIỄU MỘC",
    T5: "TUYỀN TRUNG THỦY",
    H5: "SƠN HẠ HỎA",
    O5: "ÐẠI TRẠCH THỔ",
    M5: "THẠCH LỰU MỘC",
    K5: "KIẾM PHONG KIM",
    H6: "SƠN ÐẦU HỎA",
    O6: "ỐC THƯỢNG THỔ",
    M6: "BÌNH ÐỊA MỘC",
    K6: "THOA XUYẾN KIM",
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

function getGioSinhIndex(hour) {
  // Direct mapping of hours to indices
  if (hour === 23 || hour === 0) return 1; // Tí (23:00 - 1:00)
  if (hour === 1 || hour === 2) return 2; // Sửu (1:00 - 3:00)
  if (hour === 3 || hour === 4) return 3; // Dần (3:00 - 5:00)
  if (hour === 5 || hour === 6) return 4; // Mão (5:00 - 7:00)
  if (hour === 7 || hour === 8) return 5; // Thìn (7:00 - 9:00)
  if (hour === 9 || hour === 10) return 6; // Tị (9:00 - 11:00)
  if (hour === 11 || hour === 12) return 7; // Ngọ (11:00 - 13:00)
  if (hour === 13 || hour === 14) return 8; // Mùi (13:00 - 15:00)
  if (hour === 15 || hour === 16) return 9; // Thân (15:00 - 17:00)
  if (hour === 17 || hour === 18) return 10; // Dậu (17:00 - 19:00)
  if (hour === 19 || hour === 20) return 11; // Tuất (19:00 - 21:00)
  return 12; // Hợi (21:00 - 23:00)
}

function hopCan(canNgay) {
  let hopCan = {
    1: 6,
    2: 7,
    3: 8,
    4: 9,
    5: 10,
    6: 1,
    7: 2,
    8: 3,
    9: 4,
    10: 5,
  };
  return hopCan[canNgay];
}

function hopChi(chiNgay) {
  let hopChi = {
    1: 2,
    2: 1,
    3: 12,
    4: 11,
    5: 10,
    6: 9,
    7: 8,
    8: 7,
    9: 6,
    10: 5,
    11: 4,
    12: 3,
  };
  return hopChi[chiNgay];
}

const getCanTang = (diaChi) => {
  let canTang = {
    1: ["Quý", "Nhâm"], // Tý
    2: ["Kỷ", "Tân", "Quý"], // Sửu
    3: ["Giáp", "Bính", "Mậu"], // Dần
    4: ["Ất", "Giáp"], // Mão
    5: ["Mậu", "Quý", "Ất"], // Thìn
    6: ["Bính", "Canh", "Mậu"], // Tỵ
    7: ["Đinh", "Kỷ"], // Ngọ
    8: ["Kỷ", "Ất", "Đinh"], // Mùi
    9: ["Canh", "Nhâm", "Mậu"], // Thân
    10: ["Tân", "Canh"], // Dậu
    11: ["Mậu", "Đinh", "Tân"], // Tuất
    12: ["Nhâm", "Giáp"], // Hợi
  };
  return canTang[diaChi];
};

const getThapThan = (nguHanhThienCan, nguHanhNhatChu, cungDau) => {
  console.log(nguHanhThienCan, nguHanhNhatChu, cungDau);
  let relationship = checkNguHanhRelationshipDetailed(
    nguHanhNhatChu,
    nguHanhThienCan
  );

  // Bảng thập thần dựa trên mối quan hệ ngũ hành và âm dương
  const thapThanMap = {
    "Ngang nhau": {
      cungDau: { tenDayDu: "Tỷ Kiên", goiTat: "Tỷ" },
      khacDau: { tenDayDu: "Kiếp Tài", goiTat: "Kiếp" },
    },
    Sinh: {
      cungDau: { tenDayDu: "Thực Thần", goiTat: "Thực" },
      khacDau: { tenDayDu: "Thương Quan", goiTat: "Thương" },
    },
    "Được sinh": {
      cungDau: { tenDayDu: "Thiên Ấn", goiTat: "Kiêu" },
      khacDau: { tenDayDu: "Chính Ấn", goiTat: "Ấn" },
    },
    Khắc: {
      cungDau: { tenDayDu: "Thiên Tài", goiTat: "Thiên" },
      khacDau: { tenDayDu: "Chính Tài", goiTat: "Tài" },
    },
    "Bị khắc": {
      cungDau: { tenDayDu: "Thiên Quan", goiTat: "Sát" },
      khacDau: { tenDayDu: "Chính Quan", goiTat: "Quan" },
    },
  };

  const thapThan = thapThanMap[relationship];
  if (!thapThan) {
    throw new Error(
      `Không xác định được thập thần cho mối quan hệ: ${relationship}`
    );
  }

  return cungDau ? thapThan.cungDau.tenDayDu : thapThan.khacDau.tenDayDu;
};

/**
 * Kiểm tra tương sinh tương khắc của ngũ hành
 * @param {string} hanh1 - Ngũ hành thứ nhất (K, M, T, H, O)
 * @param {string} hanh2 - Ngũ hành thứ hai (K, M, T, H, O)
 * @returns {string} - Kết quả: "Ngang nhau", "Sinh", "Được sinh", "Khắc", "Bị khắc"
 */
function checkNguHanhRelationship(hanh1, hanh2) {
  // Chuyển đổi tên ngũ hành sang ID
  const hanhToId = {
    K: 1, // Kim
    M: 2, // Mộc
    T: 3, // Thủy
    H: 4, // Hỏa
    O: 5, // Thổ
  };

  const id1 = hanhToId[hanh1];
  const id2 = hanhToId[hanh2];

  if (!id1 || !id2) {
    throw new Error("Ngũ hành phải là K, M, T, H, hoặc O");
  }

  // Nếu cùng ngũ hành
  if (id1 === id2) {
    return "Ngang nhau";
  }

  // Ma trận tương sinh tương khắc
  // 1: Kim, 2: Mộc, 3: Thủy, 4: Hỏa, 5: Thổ
  // 0: Ngang nhau, 1: Sinh, -1: Được sinh, 2: Khắc, -2: Bị khắc
  const relationshipMatrix = [
    [null, null, null, null, null, null],
    [null, 0, 2, 1, 2, 1], // Kim
    [null, -2, 0, 1, 1, -2], // Mộc
    [null, -1, -1, 0, 1, 2], // Thủy
    [null, -2, -1, -1, 0, 1], // Hỏa
    [null, -1, 2, 2, -1, 0], // Thổ
  ];

  const relationship = relationshipMatrix[id1][id2];

  switch (relationship) {
    case 0:
      return "Ngang nhau";
    case 1:
      return "Sinh";
    case -1:
      return "Được sinh";
    case 2:
      return "Khắc";
    case -2:
      return "Bị khắc";
    default:
      return "Ngang nhau";
  }
}

/**
 * Kiểm tra tương sinh tương khắc của ngũ hành (phiên bản chi tiết)
 * @param {string} hanh1 - Ngũ hành thứ nhất (K, M, T, H, O)
 * @param {string} hanh2 - Ngũ hành thứ hai (K, M, T, H, O)
 * @returns {string} - Kết quả: "Ngang nhau", "Sinh", "Được sinh", "Khắc", "Bị khắc"
 */
function checkNguHanhRelationshipDetailed(hanh1, hanh2) {
  // Chuyển đổi tên ngũ hành sang ID
  const hanhToId = {
    K: 1, // Kim
    M: 2, // Mộc
    T: 3, // Thủy
    H: 4, // Hỏa
    O: 5, // Thổ
  };

  const id1 = hanhToId[hanh1];
  const id2 = hanhToId[hanh2];

  if (!id1 || !id2) {
    throw new Error("Ngũ hành phải là K, M, T, H, hoặc O");
  }

  // Nếu cùng ngũ hành
  if (id1 === id2) {
    return "Ngang nhau";
  }

  // Ma trận tương sinh tương khắc
  // 1: Kim, 2: Mộc, 3: Thủy, 4: Hỏa, 5: Thổ
  // 0: Ngang nhau, 1: Sinh, -1: Được sinh, 2: Khắc, -2: Bị khắc
  const relationshipMatrix = [
    [null, null, null, null, null, null],
    [null, 0, 2, 1, -2, -1], // Kim
    [null, -2, 0, -1, 1, 2], // Mộc
    [null, -1, 1, 0, 2, -2], // Thủy
    [null, 2, -1, -2, 0, 1], // Hỏa
    [null, 1, -2, 2, -1, 0], // Thổ
  ];

  const rel12 = relationshipMatrix[id1][id2];

  if (rel12 === 1) return "Sinh"; // hanh1 sinh hanh2
  if (rel12 === -1) return "Được sinh"; // hanh2 sinh hanh1 (hanh1 được sinh)
  if (rel12 === 2) return "Khắc"; // hanh1 khắc hanh2
  if (rel12 === -2) return "Bị khắc"; // hanh2 khắc hanh1 (hanh1 bị khắc)
  return "Ngang nhau";
}

const getViTriTruongSinh = (thienCan) => {
  // Bảng Trường sinh theo thiên can (dựa vào ảnh)
  const truongSinhMap = {
    1: 12, // Giáp - Trường sinh ở Hợi (12)
    2: 6, // Ất - Trường sinh ở Tỵ (6)
    3: 3, // Bính - Trường sinh ở Dần (3)
    4: 9, // Đinh - Trường sinh ở Thân (9)
    5: 3, // Mậu - Trường sinh ở Dần (3)
    6: 9, // Kỷ - Trường sinh ở Thân (9)
    7: 6, // Canh - Trường sinh ở Tỵ (6)
    8: 12, // Tân - Trường sinh ở Hợi (12)
    9: 3, // Nhâm - Trường sinh ở Dần (3)
    10: 9, // Quý - Trường sinh ở Thân (9)
  };

  if (thienCan >= 1 && thienCan <= 10) {
    return truongSinhMap[thienCan];
  } else {
    throw new Error("Thiên can phải từ 1-10");
  }
};

const getTruongSinh = (thienCan, diaChi, amDuong) => {
  let viTriTruongSinh = getViTriTruongSinh(thienCan);
  let trangThaiTruongSinh = [
    "Trường sinh", // 1
    "Mộc dục", // 2
    "Quan đới", // 3
    "Lâm quan", // 4
    "Đế vượng", // 5
    "Suy", // 6
    "Bệnh", // 7
    "Tử", // 8
    "Mộ", // 9
    "Tuyệt", // 10
    "Thai", // 11
    "Dưỡng", // 12
  ];

  // Tính khoảng cách từ vị trí Trường sinh đến địa chi hiện tại
  let khoangCach = khoangCachCung(diaChi, viTriTruongSinh, amDuong ? 1 : -1);

  // Trả về trạng thái tương ứng
  if (khoangCach >= 1 && khoangCach <= 12) {
    return trangThaiTruongSinh[khoangCach];
  } else {
    throw new Error("Không xác định được trạng thái trường sinh");
  }
};
const checkThienAt = (thienCan, diaChi) => {
  // Thiên Ất quý nhân mapping based on the table
  const thienAtMapping = {
    1: [2, 8], // Giáp: Sửu, Mùi
    2: [1, 9], // Ất: Tý, Thân
    3: [10, 12], // Bính: Dậu, Hợi
    4: [10, 12], // Đinh: Dậu, Hợi
    5: [2, 8], // Mậu: Sửu, Mùi
    6: [1, 9], // Kỷ: Tý, Thân
    7: [3, 7], // Canh: Dần, Ngọ
    8: [3, 7], // Tân: Dần, Ngọ
    9: [4, 6], // Nhâm: Mão, Tị
    10: [4, 6], // Quý: Mão, Tị
  };

  // Check if the given diaChi is in the thienAt mapping for the given canNgay
  return thienAtMapping[thienCan] && thienAtMapping[thienCan].includes(diaChi);
};

const checkVanXuong = (thienCan, diaChi) => {
  // Văn Xương quý nhân mapping based on the table
  const vanXuongMapping = {
    1: 6, // Giáp: Tị
    2: 7, // Ất: Ngọ
    3: 9, // Bính: Thân
    4: 10, // Đinh: Dậu
    5: 9, // Mậu: Thân
    6: 10, // Kỷ: Dậu
    7: 12, // Canh: Hợi
    8: 1, // Tân: Tý
    9: 3, // Nhâm: Dần
    10: 4, // Quý: Mão
  };
  // Check if the given diaChi matches the vanXuong mapping for the given thienCan
  return vanXuongMapping[thienCan] === diaChi;
};

const checkHocDuong = (nguHanhNam, diaChi) => {
  // Học đường mapping based on the Five Elements table
  const hocDuongMapping = {
    M: 12, // Mộc: Hợi
    H: 3, // Hỏa: Dần
    O: 9, // Thổ: Thân
    K: 6, // Kim: Tị
    T: 9, // Thủy: Thân
  };
  // Return the Earthly Branch (Chi) for Học đường based on the Five Elements
  return hocDuongMapping[nguHanhNam] === diaChi;
};

const checkTuQuan = (nguHanhNam, diaChi) => {
  // Từ quán mapping based on the Five Elements table
  const tuQuanMapping = {
    M: 3, // Mộc: Dần
    H: 6, // Hỏa: Tị
    O: 12, // Thổ: Hợi
    K: 9, // Kim: Thân
    T: 12, // Thủy: Hợi
  };
  // Return the Earthly Branch (Chi) for Từ quán based on the Five Elements
  return tuQuanMapping[nguHanhNam] === diaChi;
};

const checkKimDu = (thienCan, diaChi) => {
  // Kim đú mapping based on the Five Elements table
  const kimDuMapping = {
    1: 5, // Giáp: Thìn
    2: 6, // Ất: Tị
    3: 8, // Bính: Mùi
    4: 9, // Đinh: Thân
    5: 4, // Mậu: Mão
    6: 9, // Kỷ: Thân
    7: 11, // Canh: Tuất
    8: 12, // Tân: Hợi
    9: 2, // Nhâm: Sửu
    10: 3, // Quý: Dần
  };

  // Check if the given diaChi matches the kimDu mapping for the given thienCan
  return kimDuMapping[thienCan] === diaChi;
};

const checkThienDuc = (chiThang, thienCan) => {
  // Thiên Đức mapping based on the table
  const thienDucMapping = {
    3: 4, // Dần: Đinh
    4: 8, // Mão: Tân
    5: 9, // Thìn: Nhâm
    6: 8, // Tị: Tân
    7: 12, // Ngọ: Hợi
    8: 1, // Mùi: Giáp
    9: 10, // Thân: Quý
    10: 3, // Dậu: Dần
    11: 3, // Tuất: Bính
    12: 2, // Hợi: Ất
    1: 6, // Tý: Tị
    2: 7, // Sửu: Canh
  };

  // Check if the given diaChi matches the thienDuc mapping for the given chiThang
  return thienDucMapping[chiThang] === thienCan;
};

const checkNguyetDuc = (chiThang, thienCan) => {
  // Nguyệt Đức mapping based on the table
  const nguyetDucMapping = {
    3: 3, // Dần: Bính
    4: 1, // Mão: Giáp
    5: 9, // Thìn: Nhâm
    6: 7, // Tị: Canh
    7: 3, // Ngọ: Bính
    8: 1, // Mùi: Giáp
    9: 9, // Thân: Nhâm
    10: 7, // Dậu: Canh
    11: 3, // Tuất: Bính
    12: 1, // Hợi: Giáp
    1: 9, // Tý: Nhâm
    2: 7, // Sửu: Canh
  };

  // Check if the given diaChi matches the nguyetDuc mapping for the given chiThang
  return nguyetDucMapping[chiThang] === thienCan;
};

const checkLocThan = (canNgay, diaChi) => {
  // Lộc Thần mapping based on the table
  const locThanMapping = {
    1: 3, // Giáp: Dần
    2: 4, // Ất: Mão
    3: 6, // Bính: Tị
    4: 7, // Đinh: Ngọ
    5: 6, // Mậu: Tị
    6: 7, // Kỷ: Ngọ
    7: 9, // Canh: Thân
    8: 10, // Tân: Dậu
    9: 12, // Nhâm: Hợi
    10: 1, // Quý: Tý
  };

  // Check if the given diaChi matches the locThan mapping for the given thienCan
  return locThanMapping[canNgay] === diaChi;
};

const checkTuongTinh = (chiNamOrNgay, diaChi) => {
  // Tướng Tinh (Hoa Cái) mapping based on the table
  const tuongTinhMapping = {
    1: 1, // Tý: Tý
    2: 10, // Sửu: Dậu
    3: 7, // Dần: Ngọ
    4: 4, // Mão: Mão
    5: 1, // Thìn: Tý
    6: 10, // Tị: Dậu
    7: 7, // Ngọ: Ngọ
    8: 4, // Mùi: Mão
    9: 1, // Thân: Tý
    10: 10, // Dậu: Dậu
    11: 7, // Tuất: Ngọ
    12: 4, // Hợi: Mão
  };

  // Check if the given diaChi matches the tuongTinh mapping for the given chiNamOrNgay
  return tuongTinhMapping[chiNamOrNgay] === diaChi;
};

const checkHoaCai = (chiNamOrNgay, diaChi) => {
  // Hoa Cái mapping based on the table
  const hoaCaiMapping = {
    1: 5, // Tý: Thìn
    2: 2, // Sửu: Sửu
    3: 11, // Dần: Tuất
    4: 8, // Mão: Mùi
    5: 5, // Thìn: Thìn
    6: 2, // Tị: Sửu
    7: 11, // Ngọ: Tuất
    8: 8, // Mùi: Mùi
    9: 5, // Thân: Thìn
    10: 2, // Dậu: Sửu
    11: 11, // Tuất: Tuất
    12: 8, // Hợi: Mùi
  };

  // Check if the given diaChi matches the hoaCai mapping for the given chiNamOrNgay
  return hoaCaiMapping[chiNamOrNgay] === diaChi;
};

const checkHongDiem = (thienCan, diaChi) => {
  // Hồng Diễm mapping based on the table
  const hongDiemMapping = {
    1: 7, // Giáp: Ngọ
    2: 9, // Ất: Thân
    3: 3, // Bính: Dần
    4: 8, // Đinh: Mùi
    5: 5, // Mậu: Thìn
    6: 5, // Kỷ: Thìn
    7: 9, // Canh: Thân
    8: 10, // Tân: Dậu
    9: 1, // Nhâm: Tý
    10: 11, // Quý: Tuất
  };

  // Check if the given diaChi matches the hongDiem mapping for the given thienCan
  return hongDiemMapping[thienCan] === diaChi;
};

const checkDichMa = (chiNam, diaChi) => {
  // Dịch Mã mapping based on traditional astrology
  const dichMaMapping = {
    1: 7, // Tý: Ngọ
    2: 8, // Sửu: Mùi
    3: 9, // Dần: Thân
    4: 10, // Mão: Dậu
    5: 11, // Thìn: Tuất
    6: 12, // Tị: Hợi
    7: 1, // Ngọ: Tý
    8: 2, // Mùi: Sửu
    9: 3, // Thân: Dần
    10: 4, // Dậu: Mão
    11: 5, // Tuất: Thìn
    12: 6, // Hợi: Tị
  };

  // Check if the given diaChi matches the dichMa mapping for the given chiNam
  return dichMaMapping[chiNam] === diaChi;
};

const checkPhucTinh = (canNgay, chiNgay) => {
  // Phúc Tinh Quý Nhân mapping based on the image
  // People born on these Can-Chi combinations have Phúc Tinh Quý Nhân
  const phucTinhMapping = [
    [1, 3], // Giáp Dần
    [2, 2], // Ất Sửu
    [3, 1], // Bính Tý
    [4, 10], // Đinh Dậu
    [5, 9], // Mậu Thân
    [6, 8], // Kỷ Mùi
    [7, 7], // Canh Ngọ
    [8, 6], // Tân Tị
    [9, 5], // Nhâm Thìn
    [10, 4], // Quý Mão
  ];

  // Check if the given canNgay and chiNgay combination exists in the phucTinh mapping
  return phucTinhMapping.some(
    ([can, chi]) => can === canNgay && chi === chiNgay
  );
};

const checkThienY = (chiThang, diaChi) => {
  // Thiên Y quý nhân mapping based on the image
  // Use the month branch to determine the Noble Person of Heavenly Doctor
  const thienYMapping = {
    1: 12, // Tý: Hợi
    2: 1, // Sửu: Tý
    3: 2, // Dần: Sửu
    4: 3, // Mão: Dần
    5: 4, // Thìn: Mão
    6: 5, // Tị: Thìn
    7: 6, // Ngọ: Tị
    8: 7, // Mùi: Ngọ
    9: 8, // Thân: Mùi
    10: 9, // Dậu: Thân
    11: 10, // Tuất: Dậu
    12: 11, // Hợi: Tuất
  };

  // Check if the given diaChi matches the thienY mapping for the given chiThang
  return thienYMapping[chiThang] === diaChi;
};

const checkDaoHoa = (chiNamOrNgay, diaChi) => {
  // Đào Hoa (Peach Blossom) mapping based on the image
  // Use Year Branch or Day Branch to determine Peach Blossom
  const daoHoaMapping = {
    1: 10, // Tý: Dậu
    2: 7, // Sửu: Ngọ
    3: 4, // Dần: Mão
    4: 1, // Mão: Tý
    5: 10, // Thìn: Dậu
    6: 7, // Tị: Ngọ
    7: 4, // Ngọ: Mão
    8: 1, // Mùi: Tý
    9: 10, // Thân: Dậu
    10: 7, // Dậu: Ngọ
    11: 4, // Tuất: Mão
    12: 1, // Hợi: Tý
  };

  // Check if the given diaChi matches the daoHoa mapping for the given chiNamOrNgay
  return daoHoaMapping[chiNamOrNgay] === diaChi;
};

const getThanSat = (
  thienCanTru,
  diaChiTru,
  canNgay,
  chiNgay,
  chiThang,
  canNam,
  chiNam,
  nhatTru
) => {
  let thanSat = [];
  if (checkThienAt(canNgay, diaChiTru) || checkThienAt(canNam, diaChiTru)) {
    thanSat.push("Thiên Ất");
  }
  if (checkVanXuong(canNgay, diaChiTru) || checkVanXuong(canNam, diaChiTru)) {
    thanSat.push("Văn Xương");
  }
  if (checkHocDuong(thienCan[canNam].nguHanh, diaChiTru)) {
    thanSat.push("Học đường");
  }
  if (checkKimDu(canNgay, diaChiTru) || checkKimDu(canNam, diaChiTru)) {
    thanSat.push("Kim Dư");
  }
  if (checkThienDuc(chiThang, thienCanTru)) {
    thanSat.push("Thiên Đức");
  }
  if (checkNguyetDuc(chiThang, thienCanTru)) {
    thanSat.push("Nguyệt Đức");
  }
  if (checkLocThan(canNgay, diaChiTru)) {
    thanSat.push("Lộc Thần");
  }
  if (checkTuongTinh(chiNam, diaChiTru) || checkTuongTinh(chiNgay, diaChiTru)) {
    thanSat.push("Tướng Tinh");
  }
  if (checkHoaCai(chiNam, diaChiTru) || checkHoaCai(chiNgay, diaChiTru)) {
    thanSat.push("Hoa Cái");
  }
  if (checkHongDiem(canNgay, diaChiTru) || checkHongDiem(canNam, diaChiTru)) {
    thanSat.push("Hồng Diễm");
  }
  if (checkDichMa(chiNam, diaChiTru) || checkDichMa(chiNgay, diaChiTru)) {
    thanSat.push("Dịch Mã");
  }
  if (nhatTru && checkPhucTinh(canNgay, chiNgay)) {
    thanSat.push("Phúc Tinh");
  }
  if (checkThienY(chiThang, diaChiTru)) {
    thanSat.push("Thiên Y");
  }
  if (checkDaoHoa(chiNam, diaChiTru) || checkDaoHoa(chiNgay, diaChiTru)) {
    thanSat.push("Đào Hoa");
  }

  // if(checkTuQuan(thienCan[canNam].nguHanh,diaChiData)){
  //   thanSat.push("Từ quán")
  // }

  return thanSat;
};

module.exports = {
  thienCan,
  diaChi,
  getTruongSinh,
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
  getGioSinhIndex,
  hopCan,
  hopChi,
  getCanTang,
  getThapThan,
  checkNguHanhRelationship,
  checkNguHanhRelationshipDetailed,
  checkThienAt,
  checkKimDu,
  checkThienDuc,
  checkNguyetDuc,
  checkLocThan,
  checkTuongTinh,
  checkHoaCai,
  checkHongDiem,
  checkDichMa,
  checkPhucTinh,
  checkThienY,
  checkDaoHoa,
  getThanSat,
};
