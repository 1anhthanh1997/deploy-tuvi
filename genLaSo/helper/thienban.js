const {
  canChiNgay,
  diaChi,
  ngayThangNam,
  ngayThangNamCanChi,
  nguHanh,
  nguHanhNapAm,
  thienCan,
  timCuc,
  sinhKhac,
} = require("./amDuong.js");
const { jdFromDate } = require("./handleTime.js");

class LapThienBan {
  constructor(
    nn,
    tt,
    nnnn,
    gioSinh,
    gioiTinh,
    ten,
    diaBan,
    duongLich = true,
    timeZone = 7,
    namXemTieuVan
  ) {
    this.gioiTinh = gioiTinh === 1 ? 1 : -1;
    this.namNu = gioiTinh === 1 ? "Nam" : "Nữ";

    const chiGioSinh = diaChi[gioSinh];
    let canGioSinh =
      ((((jdFromDate(nn, tt, nnnn) - 1) * 2) % 10) + gioSinh) % 10;
    if (canGioSinh === 0) {
      canGioSinh = 10;
    }
    this.chiGioSinh = chiGioSinh;
    this.canGioSinh = canGioSinh;
    this.gioSinh = `${thienCan[canGioSinh].tenCan} ${chiGioSinh.tenChi}`;

    this.timeZone = timeZone;
    this.today = new Date().toLocaleDateString("en-GB"); // format as DD/MM/YYYY
    if (duongLich === false) {
      const result = ngayThangNam(nn, tt, nnnn, duongLich, this.timeZone);
      this.ngayDuong = result[0];
      this.thangDuong = result[1];
      this.namDuong = result[2];
    } else {
      this.ngayDuong = nn;
      this.thangDuong = tt;
      this.namDuong = nnnn;
    }
    this.ten = ten;
    if (namXemTieuVan) {
      this.namXemTieuVan = namXemTieuVan;
      let canChi = ngayThangNamCanChi(
        5,
        5,
        namXemTieuVan,
        false,
        this.timeZone
      );
      let canTieuVan = canChi[1];
      let chiTieuVan = canChi[2];
      this.canNamTieuVanTen = thienCan[canTieuVan].tenCan;
      this.chiNamTieuVanTen = diaChi[chiTieuVan].tenChi;
    }

    if (duongLich === true) {
      const result = ngayThangNam(
        this.ngayDuong,
        this.thangDuong,
        this.namDuong,
        duongLich,
        this.timeZone
      );
      this.ngayAm = result[0];
      this.thangAm = result[1];
      this.namAm = result[2];
      this.thangNhuan = result[3];
    } else {
      this.ngayAm = nn;
      this.thangAm = tt;
      this.namAm = nnnn;
    }

    const canChiResult = ngayThangNamCanChi(
      this.ngayAm,
      this.thangAm,
      this.namAm,
      false,
      this.timeZone
    );
    this.canThang = canChiResult[0];
    this.canNam = canChiResult[1];
    this.chiNam = canChiResult[2];
    this.chiThang = this.thangAm;
    this.canThangTen = thienCan[this.canThang].tenCan;
    this.canNamTen = thienCan[this.canNam].tenCan;
    this.chiThangTen = diaChi[this.thangAm].tenChi;
    this.chiNamTen = diaChi[this.chiNam].tenChi;

    const ngayResult = canChiNgay(
      this.ngayDuong,
      this.thangDuong,
      this.namDuong,
      duongLich,
      timeZone
    );
    this.canNgay = ngayResult[0];
    this.chiNgay = ngayResult[1];
    this.canNgayTen = thienCan[this.canNgay].tenCan;
    this.chiNgayTen = diaChi[this.chiNgay].tenChi;

    const cungAmDuong = diaBan.cungMenh % 2 === 1 ? 1 : -1;
    this.amDuongNamSinh = this.chiNam % 2 === 1 ? "Dương" : "Âm";

    if (cungAmDuong * this.gioiTinh === 1) {
      this.amDuongMenh = "Âm dương thuận lý";
    } else {
      this.amDuongMenh = "Âm dương nghịch lý";
    }

    const cuc = timCuc(diaBan.cungMenh, this.canNam);
    this.hanhCuc = nguHanh(cuc).id;
    this.tenCuc = nguHanh(cuc).tenCuc;

    this.menhChu = diaChi[this.canNam].menhChu;
    this.thanChu = diaChi[this.canNam].thanChu;

    this.menh = nguHanhNapAm(this.chiNam, this.canNam);
    const menhId = nguHanh(this.menh).id;
    const menhCuc = sinhKhac(menhId, this.hanhCuc);

    if (menhCuc === 1) {
      this.sinhKhac = "Bản Mệnh sinh Cục";
    } else if (menhCuc === -1) {
      this.sinhKhac = "Bản Mệnh khắc Cục";
    } else if (menhCuc === -0 - 1) {
      // Equivalent to -1j in Python
      this.sinhKhac = "Cục khắc Bản Mệnh";
    } else if (menhCuc === 0 + 1) {
      // Equivalent to 1j in Python
      this.sinhKhac = "Cục sinh Bản mệnh";
    } else {
      this.sinhKhac = "Cục hòa Bản Mệnh";
    }

    this.banMenh = nguHanhNapAm(this.chiNam, this.canNam, true);
  }
}

module.exports = LapThienBan;
