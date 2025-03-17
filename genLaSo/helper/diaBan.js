const { diaChi, dichCung, khoangCachCung } = require("./amDuong.js");

class CungDiaBan {
  constructor(cungID) {
    const hanhCung = [
      null,
      "Thủy",
      "Thổ",
      "Mộc",
      "Mộc",
      "Thổ",
      "Hỏa",
      "Hỏa",
      "Thổ",
      "Kim",
      "Kim",
      "Thổ",
      "Thủy",
    ];

    this.cungSo = cungID;
    this.hanhCung = hanhCung[cungID];
    this.cungSao = [];
    this.cungAmDuong = this.cungSo % 2 === 0 ? -1 : 1;
    this.cungTen = diaChi[this.cungSo]["tenChi"];
    this.cungThan = false;
  }

  themSao(sao) {
    dacTinhSao(this.cungSo, sao);
    this.cungSao.push({ ...sao });
    return this;
  }

  cungChu(tenCungChu) {
    this.cungChu = tenCungChu;
    return this;
  }

  daiHan(daiHan) {
    this.cungDaiHan = daiHan;
    return this;
  }

  tieuHan(tieuHan) {
    this.cungTieuHan = diaChi[tieuHan + 1]["tenChi"];
    return this;
  }

  anCungThan() {
    this.cungThan = true;
  }

  anTuan() {
    this.tuanTrung = true;
  }

  anLuuTuan() {
    this.luuTuanTrung = true;
  }

  anTriet() {
    this.trietLo = true;
  }

  anLuuTriet() {
    this.luuTrietLo = true;
  }
}

class DiaBan {
  constructor(thangSinhAmLich, gioSinhAmLich) {
    this.thangSinhAmLich = thangSinhAmLich;
    this.gioSinhAmLich = gioSinhAmLich;
    this.thapNhiCung = Array.from({ length: 13 }, (_, i) => new CungDiaBan(i));
    this.nhapCungChu();
    this.nhapCungThan();
  }

  cungChu(thangSinhAmLich, gioSinhAmLich) {
    this.cungThan = dichCung(3, thangSinhAmLich - 1, gioSinhAmLich - 1);
    this.cungMenh = dichCung(3, thangSinhAmLich - 1, -gioSinhAmLich + 1);

    let cungPhuMau = dichCung(this.cungMenh, 1);
    let cungPhucDuc = dichCung(this.cungMenh, 2);
    let cungDienTrach = dichCung(this.cungMenh, 3);
    let cungQuanLoc = dichCung(this.cungMenh, 4);
    this.cungNoboc = dichCung(this.cungMenh, 5); // Để an sao Thiên thương
    let cungThienDi = dichCung(this.cungMenh, 6);
    this.cungTatAch = dichCung(this.cungMenh, 7); // an sao Thiên sứ
    let cungTaiBach = dichCung(this.cungMenh, 8);
    let cungTuTuc = dichCung(this.cungMenh, 9);
    let cungTheThiep = dichCung(this.cungMenh, 10);
    let cungHuynhDe = dichCung(this.cungMenh, 11);

    return [
      { cungId: 1, tenCung: "Mệnh", cungSoDiaBan: this.cungMenh },
      { cungId: 2, tenCung: "Phụ mẫu", cungSoDiaBan: cungPhuMau },
      { cungId: 3, tenCung: "Phúc đức", cungSoDiaBan: cungPhucDuc },
      { cungId: 4, tenCung: "Điền trạch", cungSoDiaBan: cungDienTrach },
      { cungId: 5, tenCung: "Quan lộc", cungSoDiaBan: cungQuanLoc },
      { cungId: 6, tenCung: "Nô bộc", cungSoDiaBan: this.cungNoboc },
      { cungId: 7, tenCung: "Thiên di", cungSoDiaBan: cungThienDi },
      { cungId: 8, tenCung: "Tật Ách", cungSoDiaBan: this.cungTatAch },
      { cungId: 9, tenCung: "Tài Bạch", cungSoDiaBan: cungTaiBach },
      { cungId: 10, tenCung: "Tử tức", cungSoDiaBan: cungTuTuc },
      { cungId: 11, tenCung: "Phu thê", cungSoDiaBan: cungTheThiep },
      { cungId: 12, tenCung: "Huynh đệ", cungSoDiaBan: cungHuynhDe },
    ];
  }

  nhapCungChu() {
    this.cungChu(this.thangSinhAmLich, this.gioSinhAmLich).forEach((cung) => {
      this.thapNhiCung[cung.cungSoDiaBan].cungChu(cung.tenCung);
    });
    return this;
  }

  nhapCungThan() {
    this.thapNhiCung[this.cungThan].anCungThan();
  }

  nhapDaiHan(cucSo, gioiTinh) {
    this.thapNhiCung.forEach((cung) => {
      const khoangCach = khoangCachCung(cung.cungSo, this.cungMenh, gioiTinh);
      cung.daiHan(cucSo + khoangCach * 10);
    });
    return this;
  }

  nhapTieuHan(khoiTieuHan, gioiTinh, chiNam) {
    const viTriCungTy1 = dichCung(khoiTieuHan, -gioiTinh * (chiNam - 1));
    this.thapNhiCung.forEach((cung) => {
      const khoangCach = khoangCachCung(cung.cungSo, viTriCungTy1, gioiTinh);
      cung.tieuHan(khoangCach);
    });
    return this;
  }

  nhapSao(cungSo, ...args) {
    args.forEach((sao) => this.thapNhiCung[cungSo].themSao(sao));
    return this;
  }

  nhapTuan(...args) {
    args.forEach((cung) => this.thapNhiCung[cung].anTuan());
    return this;
  }

  nhapLuuTuan(...args) {
    args.forEach((cung) => this.thapNhiCung[cung].anLuuTuan());
    return this;
  }

  nhapTriet(...args) {
    args.forEach((cung) => this.thapNhiCung[cung].anTriet());
    return this;
  }
  nhapLuuTriet(...args) {
    args.forEach((cung) => this.thapNhiCung[cung].anLuuTriet());
    return this;
  }
}

function dacTinhSao(viTriDiaBan, sao) {
  const maTranDacTinh = {
    1: ["Tử vi", "B", "Đ", "M", "B", "V", "M", "M", "Đ", "M", "B", "V", "B"],
    2: [
      "Liêm trinh",
      "V",
      "Đ",
      "V",
      "H",
      "M",
      "H",
      "V",
      "Đ",
      "V",
      "H",
      "M",
      "H",
    ],
    3: [
      "Thiên đồng",
      "V",
      "H",
      "M",
      "Đ",
      "H",
      "Đ",
      "H",
      "H",
      "M",
      "H",
      "H",
      "Đ",
    ],
    4: ["Vũ khúc", "V", "M", "V", "Đ", "M", "H", "V", "M", "V", "Đ", "M", "H"],
    5: [
      "Thái dương",
      "H",
      "Đ",
      "V",
      "V",
      "V",
      "M",
      "M",
      "Đ",
      "H",
      "H",
      "H",
      "H",
    ],
    6: ["Thiên cơ", "Đ", "Đ", "H", "M", "M", "V", "Đ", "Đ", "V", "M", "M", "H"],
    8: ["Thái âm", "V", "Đ", "H", "H", "H", "H", "H", "Đ", "V", "M", "M", "M"],
    9: [
      "Tham lang",
      "H",
      "M",
      "Đ",
      "H",
      "V",
      "H",
      "H",
      "M",
      "Đ",
      "H",
      "V",
      "H",
    ],
    10: ["Cự môn", "V", "H", "V", "M", "H", "H", "V", "H", "Đ", "M", "H", "Đ"],
    11: [
      "Thiên tướng",
      "V",
      "Đ",
      "M",
      "H",
      "V",
      "Đ",
      "V",
      "Đ",
      "M",
      "H",
      "V",
      "Đ",
    ],
    12: [
      "Thiên lương",
      "V",
      "Đ",
      "V",
      "V",
      "M",
      "H",
      "M",
      "Đ",
      "V",
      "H",
      "M",
      "H",
    ],
    13: [
      "Thất sát",
      "M",
      "Đ",
      "M",
      "H",
      "H",
      "V",
      "M",
      "Đ",
      "M",
      "H",
      "H",
      "V",
    ],
    14: [
      "Phá quân",
      "M",
      "V",
      "H",
      "H",
      "Đ",
      "H",
      "M",
      "V",
      "H",
      "H",
      "Đ",
      "H",
    ],
    51: ["Đà la", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H"],
    52: [
      "Kình dương",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "H",
    ],
    55: [
      "Linh tinh",
      "H",
      "H",
      "Đ",
      "Đ",
      "Đ",
      "Đ",
      "Đ",
      "H",
      "H",
      "H",
      "H",
      "H",
    ],
    56: [
      "Hỏa tinh",
      "H",
      "H",
      "Đ",
      "Đ",
      "Đ",
      "Đ",
      "Đ",
      "H",
      "H",
      "H",
      "H",
      "H",
    ],
    57: [
      "Văn xương",
      "H",
      "Đ",
      "H",
      "Đ",
      "H",
      "Đ",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "Đ",
    ],
    58: [
      "Văn khúc",
      "H",
      "Đ",
      "H",
      "Đ",
      "H",
      "Đ",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "Đ",
    ],
    53: [
      "Địa không",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
    ],
    54: [
      "Địa kiếp",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
      "H",
      "H",
      "Đ",
    ],
    95: [
      "Hóa kỵ",
      null,
      "Đ",
      null,
      null,
      "Đ",
      null,
      null,
      "Đ",
      null,
      null,
      "Đ",
      null,
    ],
    36: [
      "Đại hao",
      null,
      null,
      "Đ",
      "Đ",
      null,
      null,
      null,
      null,
      "Đ",
      "Đ",
      null,
      null,
    ],
    30: [
      "Tiểu Hao",
      null,
      null,
      "Đ",
      "Đ",
      null,
      null,
      null,
      null,
      "Đ",
      "Đ",
      null,
      null,
    ],
    69: [
      "Thiên khốc",
      "Đ",
      "Đ",
      null,
      "Đ",
      null,
      null,
      "Đ",
      "Đ",
      null,
      "Đ",
      null,
      null,
    ],
    70: [
      "Thiên hư",
      "Đ",
      "Đ",
      null,
      "Đ",
      null,
      null,
      "Đ",
      "Đ",
      null,
      "Đ",
      null,
      null,
    ],
    98: [
      "Thiên mã",
      null,
      null,
      "Đ",
      null,
      null,
      "Đ",
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    73: [
      "Thiên Hình",
      null,
      null,
      "Đ",
      "Đ",
      null,
      null,
      null,
      null,
      "Đ",
      "Đ",
      null,
      null,
    ],
    74: [
      "Thiên riêu",
      null,
      null,
      "Đ",
      "Đ",
      null,
      null,
      null,
      null,
      null,
      "Đ",
      "Đ",
      null,
    ],
  };

  if (maTranDacTinh[sao.saoID]) {
    const dacTinh = maTranDacTinh[sao.saoID][viTriDiaBan];
    if (["M", "V", "Đ", "B", "H"].includes(dacTinh)) {
      sao.anDacTinh(dacTinh);
    }
  }
}

module.exports = DiaBan;
