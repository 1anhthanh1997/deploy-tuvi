const { S2L, jdFromDate } = require("./handleTime.js");
const {
  thienCan,
  diaChi,
  canChiNgay,
  ngayThangNamCanChi,
  nguHanh,
  nguHanhNapAm,
  hopCan,
  hopChi,
  getCanTang,
  getThapThan,
  getTruongSinh,
  getThanSat,
  getNextDay,
  getGioSinhIndex,
} = require("./amDuong.js");

// Helper function to get index with modulo
const getIndex = (index, period = 12) => {
  return index % period ? index % period : period;
};

// Helper function to convert hour info
const convertHourInfo = (baseInfo) => {
  let { ngaySinh, thangSinh, namSinh, gioSinh, duongLich } = baseInfo;
  if (gioSinh === 23) {
    [ngaySinh, thangSinh, namSinh] = getNextDay(
      ngaySinh,
      thangSinh,
      namSinh,
      duongLich
    );
  }
  // gioSinh = getGioSinhIndex(gioSinh);
  baseInfo.gioSinh = gioSinh;
  baseInfo.ngaySinh = ngaySinh;
  baseInfo.thangSinh = thangSinh;
  baseInfo.namSinh = namSinh;
  return baseInfo;
};

const getBaziData = (baseInfo) => {
  let originHour = baseInfo.gioSinh;
  baseInfo = convertHourInfo(baseInfo);
  let amLich = S2L(
    baseInfo.ngaySinh,
    baseInfo.thangSinh,
    baseInfo.namSinh,
    baseInfo.timeZone
  );
  const chiGioSinh = diaChi[baseInfo.gioSinh];
  let canGioSinh =
    ((((jdFromDate(baseInfo.ngaySinh, baseInfo.thangSinh, baseInfo.namSinh) -
      1) *
      2) %
      10) +
      baseInfo.gioSinh) %
    10;
  if (canGioSinh === 0) {
    canGioSinh = 10;
  }
  let canGioSinhTen = thienCan[canGioSinh].tenCan;
  let chiGioSinhTen = chiGioSinh.tenChi;
  const ngayResult = canChiNgay(
    baseInfo.ngaySinh,
    baseInfo.thangSinh,
    baseInfo.namSinh,
    baseInfo.duongLich,
    baseInfo.timeZone
  );
  let canNgay = ngayResult[0];
  let chiNgay = ngayResult[1];

  let canChiAmLich = ngayThangNamCanChi(
    amLich[0],
    amLich[1],
    amLich[2],
    amLich[3]
  );
  console.log("Can chi:", canChiAmLich);
  let canThang = canChiAmLich[0];
  let chiThang = amLich[1];
  let canNam = canChiAmLich[1];
  let chiNam = canChiAmLich[2];
  let canNgayTen = thienCan[canNgay].tenCan;
  let chiNgayTen = diaChi[chiNgay].tenChi;
  let canThangTen = thienCan[canThang].tenCan;
  let canNamTen = thienCan[canNam].tenCan;
  let chiThangTen = diaChi[getIndex(chiThang + 2)].tenChi;
  let chiNamTen = diaChi[chiNam].tenChi;
  let gioAmTen = canGioSinhTen + " " + chiGioSinhTen;
  let ngayAmTen = canNgayTen + " " + chiNgayTen;
  let thangAmTen = canThangTen + " " + chiThangTen;
  let namAmTen = canNamTen + " " + chiNamTen;
  let canThaiNguyen = getIndex(canThang + 1, 10);
  let chiThaiNguyen = getIndex(chiThang + 5);
  console.log(canThaiNguyen, chiThaiNguyen);
  let canThaiNguyenTen = thienCan[canThaiNguyen].tenCan;
  let chiThaiNguyenTen = diaChi[chiThaiNguyen].tenChi;
  let canThaiTuc = hopCan(canNgay);
  let chiThaiTuc = hopChi(chiNgay);
  let canThaiTucTen = thienCan[canThaiTuc].tenCan;
  let chiThaiTucTen = diaChi[chiThaiTuc].tenChi;
  let chiCungMenh = getIndex(26 - (chiThang + (baseInfo.gioSinh - 2)));
  let canThangGieng = (canNam * 2 + 1) % 10;
  let canCungMenh = getIndex(canThangGieng + chiCungMenh - 1, 10);
  let canCungMenhTen = thienCan[canCungMenh].tenCan;
  let chiCungMenhTen = diaChi[chiCungMenh].tenChi;
  return {
    hour: {
      name: gioAmTen,
      solarValue: originHour,
      lunarValue: chiGioSinhTen,
      nguHanhNapAm: nguHanhNapAm(baseInfo.gioSinh, canGioSinh, true),
      nguHanhCan: nguHanh(thienCan[canGioSinh].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[baseInfo.gioSinh].tenHanh).tenHanh,
      canTang: getCanTang(baseInfo.gioSinh),
      thapThan: getThapThan(
        thienCan[canGioSinh].nguHanh,
        thienCan[canNgay].nguHanh,
        thienCan[canGioSinh].amDuong === thienCan[canNgay].amDuong
      ),
      truongSinh: getTruongSinh(
        canNgay,
        baseInfo.gioSinh,
        thienCan[canNgay].amDuong
      ),
      thanSat: getThanSat(
        canGioSinh,
        baseInfo.gioSinh,
        canNgay,
        chiNgay,
        chiThang + 2,
        canNam,
        chiNam
      ).join(", "),
    },
    day: {
      name: ngayAmTen,
      solarValue: baseInfo.ngaySinh,
      lunarValue: amLich[0],
      nguHanhNapAm: nguHanhNapAm(chiNgay, canNgay, true),
      nguHanhCan: nguHanh(thienCan[canNgay].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[chiNgay].tenHanh).tenHanh,
      canTang: getCanTang(chiNgay),
      thapThan: "Nhật chủ",
      truongSinh: getTruongSinh(canNgay, chiNgay, thienCan[canNgay].amDuong),
      thanSat: getThanSat(
        canNgay,
        chiNgay,
        canNgay,
        chiNgay,
        chiThang + 2,
        canNam,
        chiNam
      ).join(", "),
    },
    month: {
      name: thangAmTen,
      solarValue: baseInfo.thangSinh,
      lunarValue: amLich[1],
      nguHanhNapAm: nguHanhNapAm(getIndex(chiThang + 2), canThang, true),
      nguHanhCan: nguHanh(thienCan[canThang].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[getIndex(chiThang + 2)].tenHanh).tenHanh,
      canTang: getCanTang(getIndex(chiThang + 2)),
      thapThan: getThapThan(
        thienCan[canThang].nguHanh,
        thienCan[canNgay].nguHanh,
        thienCan[canThang].amDuong === thienCan[canNgay].amDuong
      ),
      truongSinh: getTruongSinh(
        canNgay,
        chiThang + 2,
        thienCan[canThang].amDuong
      ),
      thanSat: getThanSat(
        canThang,
        chiThang + 2,
        canNgay,
        chiNgay,
        chiThang + 2,
        canNam,
        chiNam
      ).join(", "),
    },
    year: {
      name: namAmTen,
      solarValue: baseInfo.namSinh,
      lunarValue: amLich[2],
      nguHanhNapAm: nguHanhNapAm(chiNam, canNam, true),
      nguHanhCan: nguHanh(thienCan[canNam].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[chiNam].tenHanh).tenHanh,
      canTang: getCanTang(chiNam),
      thapThan: getThapThan(
        thienCan[canNam].nguHanh,
        thienCan[canNgay].nguHanh,
        thienCan[canNam].amDuong === thienCan[canNgay].amDuong
      ),
      truongSinh: getTruongSinh(canNgay, chiNam, thienCan[canNam].amDuong),
      thanSat: getThanSat(
        canNam,
        chiNam,
        canNgay,
        chiNgay,
        chiThang + 2,
        canNam,
        chiNam
      ).join(", "),
    },
    thaiNguyen: {
      name: canThaiNguyenTen + " " + chiThaiNguyenTen,
      nguHanhNapAm: nguHanhNapAm(chiThaiNguyen, canThaiNguyen, true),
      nguHanhCan: nguHanh(thienCan[canThaiNguyen].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[chiThaiNguyen].tenHanh).tenHanh,
    },
    thaiTuc: {
      name: canThaiTucTen + " " + chiThaiTucTen,
      nguHanhNapAm: nguHanhNapAm(chiThaiTuc, canThaiTuc, true),
      nguHanhCan: nguHanh(thienCan[canThaiTuc].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[chiThaiTuc].tenHanh).tenHanh,
    },
    cungMenh: {
      name: canCungMenhTen + " " + chiCungMenhTen,
      nguHanhNapAm: nguHanhNapAm(chiCungMenh, canCungMenh, true),
      nguHanhCan: nguHanh(thienCan[canCungMenh].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[chiCungMenh].tenHanh).tenHanh,
    },
  };
};

module.exports = {
  getBaziData,
};
