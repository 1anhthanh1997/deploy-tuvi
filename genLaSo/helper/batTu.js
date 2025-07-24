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
  checkNguHanhRelationshipDetailed,
} = require("./amDuong.js");
const Decimal = require("decimal.js");

// Helper function to get index with modulo
const getIndex = (index, period = 12) => {
  return index % period ? index % period : period;
};

const calculateEnergyScore = (can, score, nguHanhScore) => {
  if (!can) return nguHanhScore;
  let nguHanhCan = thienCan[can].nguHanhID;
  let amDuong = thienCan[can].amDuong;
  let duong = nguHanhScore.find((item) => item.id === nguHanhCan);
  if (amDuong === -1) {
    duong.scoreAm += score;
  } else {
    duong.scoreDuong += score;
  }
  return nguHanhScore;
};

const calculateEnergyScoreByChi = (chi, score, nguHanhScore) => {
  if (!chi) return nguHanhScore;
  let nguHanhChi = diaChi[chi].tenHanh;
  let amDuong = diaChi[chi].amDuong;
  let duong = nguHanhScore.find((item) => item.shortName === nguHanhChi);
  if (amDuong === -1) {
    duong.scoreAm += score;
  } else {
    duong.scoreDuong += score;
  }
  return nguHanhScore;
};

const calculateFromNguHanhId = (nguHanhId, score, nguHanhScore) => {
  let nguHanh = nguHanhScore.find((item) => item.id === nguHanhId);
  nguHanh.scoreAm += score / 2;
  nguHanh.scoreDuong += score / 2;
  return nguHanhScore;
};

const getCanTangScore = (diaChi, nguHanhScore) => {
  if (!diaChi) return nguHanhScore;
  let canTangIndex = {
    1: [
      { id: 10, score: 46.65 },
      { id: 9, score: 3.35 },
    ], // Tý: Quý,Nhâm
    2: [
      { id: 6, score: 30 },
      { id: 8, score: 15 },
      { id: 10, score: 5 },
    ], // Sửu: Kỷ, Tân, Quý
    3: [
      { id: 1, score: 30 },
      { id: 3, score: 15 },
      { id: 5, score: 5 },
    ], // Dần: Giáp, Bính, Mậu
    4: [
      { id: 2, score: 46.35 },
      { id: 1, score: 3.35 },
    ], // Mão: Ất,Giáp
    5: [
      { id: 5, score: 46.65 },
      { id: 10, score: 5 },
      { id: 2, score: 3.35 },
    ], // Thìn: Mậu, Quý, Ất
    6: [
      { id: 3, score: 30 },
      { id: 7, score: 15 },
      { id: 5, score: 5 },
    ], // Tỵ: Bính, Canh, Mậu
    7: [
      { id: 4, score: 30 },
      { id: 6, score: 20 },
    ], // Ngọ: Đinh, Kỷ
    8: [
      { id: 6, score: 30 },
      { id: 2, score: 15 },
      { id: 4, score: 5 },
    ], // Mùi: Kỷ, Ất, Đinh
    9: [
      { id: 7, score: 30 },
      { id: 9, score: 15 },
      { id: 5, score: 5 },
    ], // Thân: Canh, Nhâm, Mậu
    10: [
      { id: 8, score: 46.65 },
      { id: 7, score: 3.35 },
    ], // Dậu: Tân,Canh
    11: [
      { id: 5, score: 30 },
      { id: 4, score: 15 },
      { id: 8, score: 5 },
    ], // Tuất: Mậu, Đinh, Tân
    12: [
      { id: 9, score: 30 },
      { id: 1, score: 20 },
    ], // Hợi: Nhâm, Giáp
  };
  let canTang = canTangIndex[diaChi];
  canTang.forEach((item) => {
    nguHanhScore = calculateEnergyScore(item.id, item.score, nguHanhScore);
  });
  return nguHanhScore;
};

const getDacViScore = (can, chi, nguHanhScore) => {
  if (!can || !chi) return nguHanhScore;
  let nguHanhCan = thienCan[can].nguHanh;
  let nguHanhChi = diaChi[chi].tenHanh;
  if (
    nguHanhCan === nguHanhChi ||
    checkNguHanhRelationshipDetailed(nguHanhChi, nguHanhCan) === "Sinh"
  ) {
    nguHanhScore = calculateEnergyScore(can, 30, nguHanhScore);
  }
  return nguHanhScore;
};

const isSubset = (subset, superset) => {
  return subset.every((item) => superset.includes(item));
};

const getDacTheScore = (bazi, nguHanhScore) => {
  let chiList = [bazi.gio.chi, bazi.ngay.chi, bazi.thang.chi, bazi.nam.chi];
  let canList = [bazi.gio.can, bazi.ngay.can, bazi.thang.can, bazi.nam.can];
  if (bazi.thoiVan.can) {
    canList.push(bazi.thoiVan.can);
  }
  if (bazi.nhatVan.can) {
    canList.push(bazi.nhatVan.can);
  }
  if (bazi.nguyetVan.can) {
    canList.push(bazi.nguyetVan.can);
  }
  if (bazi.tieuVan.can) {
    canList.push(bazi.tieuVan.can);
  }
  if (bazi.daiVan.can) {
    canList.push(bazi.daiVan.can);
  }
  if (bazi.thoiVan.chi) {
    chiList.push(bazi.thoiVan.chi);
  }
  if (bazi.nhatVan.chi) {
    chiList.push(bazi.nhatVan.chi);
  }
  if (bazi.nguyetVan.chi) {
    chiList.push(bazi.nguyetVan.chi);
  }
  if (bazi.tieuVan.chi) {
    chiList.push(bazi.tieuVan.chi);
  }
  if (bazi.daiVan.chi) {
    chiList.push(bazi.daiVan.chi);
  }
  const dacTheChiScore = [
    { id: 0, chiList: [1, 2], nguHanhId: 5, score: 40 },
    { id: 1, chiList: [3, 12], nguHanhId: 2, score: 40 },
    { id: 2, chiList: [4, 11], nguHanhId: 4, score: 40 },
    { id: 3, chiList: [5, 10], nguHanhId: 1, score: 40 },
    { id: 4, chiList: [6, 9], nguHanhId: 3, score: 40 },
    { id: 5, chiList: [3, 7, 11], nguHanhId: 4, score: 60 },
    { id: 6, chiList: [9, 1, 5], nguHanhId: 3, score: 60 },
    { id: 7, chiList: [6, 10, 2], nguHanhId: 1, score: 60 },
    { id: 8, chiList: [12, 4, 8], nguHanhId: 2, score: 60 },
    { id: 9, chiList: [5, 11, 2, 8], nguHanhId: 5, score: 120 },
    { id: 10, chiList: [3, 4, 5], nguHanhId: 2, score: 90 },
    { id: 11, chiList: [6, 7, 8], nguHanhId: 4, score: 90 },
    { id: 12, chiList: [9, 10, 11], nguHanhId: 1, score: 90 },
    { id: 13, chiList: [12, 1, 2], nguHanhId: 3, score: 90 },
  ];
  const dacTheCanScore = [
    { id: 0, canList: [1, 6], nguHanhId: 5, score: 20 },
    { id: 1, canList: [2, 7], nguHanhId: 1, score: 20 },
    { id: 2, canList: [3, 8], nguHanhId: 3, score: 20 },
    { id: 3, canList: [4, 9], nguHanhId: 2, score: 20 },
    { id: 4, canList: [5, 10], nguHanhId: 4, score: 20 },
  ];

  dacTheChiScore.forEach((item) => {
    if (isSubset(item.chiList, chiList)) {
      nguHanhScore = calculateFromNguHanhId(
        item.nguHanhId,
        item.score,
        nguHanhScore
      );
    }
  });
  dacTheCanScore.forEach((item) => {
    if (isSubset(item.canList, canList)) {
      nguHanhScore = calculateFromNguHanhId(
        item.nguHanhId,
        item.score,
        nguHanhScore
      );
    }
  });
  return nguHanhScore;
};

function safeMultiply(a, b) {
  let score = new Decimal(a);
  let coefficient = new Decimal(b);
  let result = score.mul(coefficient);
  return result.toNumber();
}

const calculateWithCoefficient = (chiThang, nguHanhScore) => {
  if (!chiThang) return nguHanhScore;
  const coefficient = [
    {
      id: 1, // Tháng 1 (Dần)
      scale: [
        { nguHanhId: 2, coefficient: 1.5 }, // Mộc
        { nguHanhId: 5, coefficient: 0.5 }, // Thổ
        { nguHanhId: 3, coefficient: 0.9 }, // Thủy
        { nguHanhId: 4, coefficient: 1.3 }, // Hỏa
        { nguHanhId: 1, coefficient: 0.7 }, // Kim
      ],
    },
    {
      id: 2, // Tháng 2 (Mão)
      scale: [
        { nguHanhId: 2, coefficient: 1.5 },
        { nguHanhId: 5, coefficient: 0.5 },
        { nguHanhId: 3, coefficient: 0.9 },
        { nguHanhId: 4, coefficient: 1.3 },
        { nguHanhId: 1, coefficient: 0.7 },
      ],
    },
    {
      id: 3, // Tháng 3 (Thìn)
      scale: [
        { nguHanhId: 2, coefficient: 1.3 },
        { nguHanhId: 5, coefficient: 1.5 },
        { nguHanhId: 3, coefficient: 0.5 },
        { nguHanhId: 4, coefficient: 0.9 },
        { nguHanhId: 1, coefficient: 0.7 },
      ],
    },
    {
      id: 4, // Tháng 4 (Tỵ)
      scale: [
        { nguHanhId: 2, coefficient: 0.9 },
        { nguHanhId: 5, coefficient: 1.3 },
        { nguHanhId: 3, coefficient: 0.7 },
        { nguHanhId: 4, coefficient: 1.5 },
        { nguHanhId: 1, coefficient: 0.5 },
      ],
    },
    {
      id: 5, // Tháng 5 (Ngọ)
      scale: [
        { nguHanhId: 2, coefficient: 0.7 },
        { nguHanhId: 5, coefficient: 1.3 },
        { nguHanhId: 3, coefficient: 0.7 },
        { nguHanhId: 4, coefficient: 1.5 },
        { nguHanhId: 1, coefficient: 0.5 },
      ],
    },
    {
      id: 6, // Tháng 6 (Mùi)
      scale: [
        { nguHanhId: 2, coefficient: 0.7 },
        { nguHanhId: 5, coefficient: 1.5 },
        { nguHanhId: 3, coefficient: 0.7 },
        { nguHanhId: 4, coefficient: 1.3 },
        { nguHanhId: 1, coefficient: 0.9 },
      ],
    },
    {
      id: 7, // Tháng 7 (Thân)
      scale: [
        { nguHanhId: 2, coefficient: 0.5 },
        { nguHanhId: 5, coefficient: 0.9 },
        { nguHanhId: 3, coefficient: 1.3 },
        { nguHanhId: 4, coefficient: 0.7 },
        { nguHanhId: 1, coefficient: 1.5 },
      ],
    },
    {
      id: 8, // Tháng 8 (Dậu)
      scale: [
        { nguHanhId: 2, coefficient: 0.5 },
        { nguHanhId: 5, coefficient: 0.9 },
        { nguHanhId: 3, coefficient: 1.3 },
        { nguHanhId: 4, coefficient: 0.7 },
        { nguHanhId: 1, coefficient: 1.5 },
      ],
    },
    {
      id: 9, // Tháng 9 (Tuất)
      scale: [
        { nguHanhId: 2, coefficient: 0.7 },
        { nguHanhId: 5, coefficient: 1.5 },
        { nguHanhId: 3, coefficient: 0.9 },
        { nguHanhId: 4, coefficient: 0.5 },
        { nguHanhId: 1, coefficient: 1.5 },
      ],
    },
    {
      id: 10, // Tháng 10 (Hợi)
      scale: [
        { nguHanhId: 2, coefficient: 1.3 },
        { nguHanhId: 5, coefficient: 0.7 },
        { nguHanhId: 3, coefficient: 1.5 },
        { nguHanhId: 4, coefficient: 0.5 },
        { nguHanhId: 1, coefficient: 0.9 },
      ],
    },
    {
      id: 11, // Tháng 11 (Tý)
      scale: [
        { nguHanhId: 2, coefficient: 1.3 },
        { nguHanhId: 5, coefficient: 0.7 },
        { nguHanhId: 3, coefficient: 1.5 },
        { nguHanhId: 4, coefficient: 0.5 },
        { nguHanhId: 1, coefficient: 0.9 },
      ],
    },
    {
      id: 12, // Tháng 12 (Sửu)
      scale: [
        { nguHanhId: 2, coefficient: 0.9 },
        { nguHanhId: 5, coefficient: 1.5 },
        { nguHanhId: 3, coefficient: 1.3 },
        { nguHanhId: 4, coefficient: 0.7 },
        { nguHanhId: 1, coefficient: 0.5 },
      ],
    },
  ];

  let scaleMonth = coefficient.find(
    (item) => getIndex(item.id + 2) === chiThang
  );
  scaleMonth.scale.forEach((scale) => {
    let nguHanh = nguHanhScore.find((item) => item.id === scale.nguHanhId);
    nguHanh.scale = scale.coefficient;
    nguHanh.total = safeMultiply(
      nguHanh.scoreAm + nguHanh.scoreDuong,
      scale.coefficient
    );
    nguHanh.scoreAm = safeMultiply(nguHanh.scoreAm, scale.coefficient);
    nguHanh.scoreDuong = safeMultiply(nguHanh.scoreDuong, scale.coefficient);
  });
  return nguHanhScore;
};

const calcNguHanhScore = (bazi) => {
  let nguHanhScore = [
    {
      id: 1,
      name: "Kim",
      shortName: "K",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
    },
    {
      id: 2,
      name: "Mộc",
      shortName: "M",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
    },
    {
      id: 3,
      name: "Thủy",
      shortName: "T",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
    },
    {
      id: 4,
      name: "Hỏa",
      shortName: "H",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
    },
    {
      id: 5,
      name: "Thổ",
      shortName: "O",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
    },
  ];
  let { gio, ngay, thang, nam, thoiVan, nhatVan, nguyetVan, tieuVan, daiVan } =
    bazi;
  let canGio = gio.can;
  let chiGio = gio.chi;
  let canNgay = ngay.can;
  let chiNgay = ngay.chi;
  let canThang = thang.can;
  let chiThang = thang.chi;
  let canNam = nam.can;
  let chiNam = nam.chi;
  let canThoiVan = thoiVan.can;
  let chiThoiVan = thoiVan.chi;
  let canNhatVan = nhatVan.can;
  let chiNhatVan = nhatVan.chi;
  let canNguyetVan = nguyetVan.can;
  let chiNguyetVan = nguyetVan.chi;
  let canTieuVan = tieuVan.can;
  let chiTieuVan = tieuVan.chi;
  let canDaiVan = daiVan.can;
  let chiDaiVan = daiVan.chi;
  //calculate energy score
  nguHanhScore = calculateEnergyScore(canGio, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canNgay, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canThang, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canNam, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canThoiVan, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canNhatVan, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canNguyetVan, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canTieuVan, 40, nguHanhScore);
  nguHanhScore = calculateEnergyScore(canDaiVan, 40, nguHanhScore);
  //calculate energy score by chi
  console.log("chiThoiVan", chiThoiVan);

  nguHanhScore = calculateEnergyScoreByChi(chiThoiVan, 50, nguHanhScore);
  nguHanhScore = calculateEnergyScoreByChi(chiNhatVan, 50, nguHanhScore);
  console.log("chiNhatVan", chiNhatVan);
  nguHanhScore = calculateEnergyScoreByChi(chiNguyetVan, 50, nguHanhScore);
  console.log("chiNguyetVan", chiNguyetVan);
  nguHanhScore = calculateEnergyScoreByChi(chiTieuVan, 50, nguHanhScore);
  console.log("chiTieuVan", chiTieuVan);
  nguHanhScore = calculateEnergyScoreByChi(chiDaiVan, 50, nguHanhScore);
  console.log("chiDaiVan", chiDaiVan);
  //calculate can tang score
  nguHanhScore = getCanTangScore(chiGio, nguHanhScore);
  nguHanhScore = getCanTangScore(chiNgay, nguHanhScore);
  nguHanhScore = getCanTangScore(chiThang, nguHanhScore);
  nguHanhScore = getCanTangScore(chiNam, nguHanhScore);
  nguHanhScore = getCanTangScore(chiThoiVan, nguHanhScore);
  nguHanhScore = getCanTangScore(chiNhatVan, nguHanhScore);
  nguHanhScore = getCanTangScore(chiNguyetVan, nguHanhScore);
  nguHanhScore = getCanTangScore(chiTieuVan, nguHanhScore);
  nguHanhScore = getCanTangScore(chiDaiVan, nguHanhScore);
  //calculate dac vi score
  nguHanhScore = getDacViScore(canGio, chiGio, nguHanhScore);
  nguHanhScore = getDacViScore(canNgay, chiNgay, nguHanhScore);
  nguHanhScore = getDacViScore(canThang, chiThang, nguHanhScore);
  nguHanhScore = getDacViScore(canNam, chiNam, nguHanhScore);
  nguHanhScore = getDacViScore(canThoiVan, chiThoiVan, nguHanhScore);
  nguHanhScore = getDacViScore(canNhatVan, chiNhatVan, nguHanhScore);
  nguHanhScore = getDacViScore(canNguyetVan, chiNguyetVan, nguHanhScore);
  nguHanhScore = getDacViScore(canTieuVan, chiTieuVan, nguHanhScore);
  nguHanhScore = getDacViScore(canDaiVan, chiDaiVan, nguHanhScore);
  //calculate dac the score
  nguHanhScore = getDacTheScore(bazi, nguHanhScore);
  //calculate with coefficient
  nguHanhScore = calculateWithCoefficient(chiThang, nguHanhScore);
  //calculate with coeficient nguyet van
  nguHanhScore = calculateWithCoefficient(chiNguyetVan, nguHanhScore);

  //calculate by percent
  nguHanhScore = calcNguHanhPercent(nguHanhScore);
  return nguHanhScore;
};

const calcNguHanhPercent = (nguHanhScore) => {
  const total = nguHanhScore.reduce((sum, nh) => sum + nh.total, 0);
  return nguHanhScore.map((nh) => ({
    ...nh,
    percent: (total === 0 ? 0 : (nh.total / total) * 100).toFixed(2),
  }));
};
// Helper function to convert hour info
const convertHourInfo = (baseInfo) => {
  let {
    ngaySinh,
    thangSinh,
    namSinh,
    gioSinh,
    duongLich,
    namXemTieuVan,
    thangLuuNguyet,
    ngayLuuNhat,
    gioThoiVan,
  } = baseInfo;
  if (gioSinh === 23) {
    [ngaySinh, thangSinh, namSinh] = getNextDay(
      ngaySinh,
      thangSinh,
      namSinh,
      duongLich
    );
  }
  if (gioThoiVan === 23) {
    [ngayLuuNhat, thangLuuNguyet, namXemTieuVan] = getNextDay(
      ngayLuuNhat,
      thangLuuNguyet,
      namXemTieuVan,
      duongLich
    );
  }
  // gioSinh = getGioSinhIndex(gioSinh);
  baseInfo.gioSinh = gioSinh;
  baseInfo.ngaySinh = ngaySinh;
  baseInfo.thangSinh = thangSinh;
  baseInfo.namSinh = namSinh;
  baseInfo.gioThoiVan = gioThoiVan;
  baseInfo.namXemTieuVan = namXemTieuVan;
  baseInfo.thangLuuNguyet = thangLuuNguyet;
  baseInfo.ngayLuuNhat = ngayLuuNhat;
  return baseInfo;
};

const getBaziData = (baseInfo, thapNhiCung) => {
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
  let canThoiVan;
  let chiThoiVan;
  let canNhatVan;
  let chiNhatVan;
  let canNguyetVan;
  let chiNguyetVan;
  let canTieuVan;
  let chiTieuVan;
  let canDaiVan;
  let chiDaiVan;
  if (baseInfo.namXemTieuVan) {
    let amLichVan = S2L(
      baseInfo.ngayLuuNhat ? baseInfo.ngayLuuNhat : 15,
      baseInfo.thangLuuNguyet ? baseInfo.thangLuuNguyet : 5,
      baseInfo.namXemTieuVan ? baseInfo.namXemTieuVan : 1,
      baseInfo.timeZone
    );
    if (baseInfo.gioThoiVan) {
      chiThoiVan = diaChi[baseInfo.gioThoiVan];
      canThoiVan =
        ((((jdFromDate(
          baseInfo.ngayLuuNhat,
          baseInfo.thangLuuNguyet,
          baseInfo.namXemTieuVan
        ) -
          1) *
          2) %
          10) +
          baseInfo.gioThoiVan) %
        10;
      if (canThoiVan === 0) {
        canThoiVan = 10;
      }
    }
    chiThoiVan = diaChi[baseInfo.gioThoiVan];
    if (baseInfo.gioNhatVan) {
      const nhatVanResult = canChiNgay(
        baseInfo.ngayLuuNhat,
        baseInfo.thangLuuNguyet,
        baseInfo.namXemTieuVan,
        baseInfo.duongLich,
        baseInfo.timeZone
      );
      canNhatVan = nhatVanResult[0];
      chiNhatVan = nhatVanResult[1];
    }
    let canChiAmLichVan = ngayThangNamCanChi(
      amLichVan[0],
      amLichVan[1],
      amLichVan[2],
      amLichVan[3]
    );
    if (baseInfo.thangLuuNguyet) {
      canNguyetVan = canChiAmLichVan[0];
      chiNguyetVan = amLichVan[1];
    }
    canTieuVan = canChiAmLichVan[1];
    chiTieuVan = canChiAmLichVan[2];
    let tuoi = baseInfo.namXemTieuVan - baseInfo.namSinh + 1;
    let cungDaiVan = null;
    for (let cung of thapNhiCung) {
      if (
        (cung.cungDaiHan < 10 && tuoi < 10) ||
        (cung.cungDaiHan <= tuoi && cung.cungDaiHan + 10 > tuoi)
      ) {
        cungDaiVan = cung;
      }
    }
    canDaiVan = cungDaiVan.cungCan;
    chiDaiVan = cungDaiVan.cungSo;
  }

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
  let nguHanhScore = calcNguHanhScore({
    gio: { can: canGioSinh, chi: baseInfo.gioSinh },
    ngay: { can: canNgay, chi: chiNgay },
    thang: { can: canThang, chi: getIndex(chiThang + 2) },
    nam: { can: canNam, chi: chiNam },
    thoiVan: { can: canThoiVan, chi: chiThoiVan?.id },
    nhatVan: { can: canNhatVan, chi: chiNhatVan },
    nguyetVan: {
      can: canNguyetVan,
      chi: chiNguyetVan ? getIndex(chiNguyetVan + 2) : undefined,
    },
    tieuVan: { can: canTieuVan, chi: chiTieuVan },
    daiVan: { can: canDaiVan, chi: chiDaiVan },
  });

  return {
    nguHanhScore,
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
    },
  };
};

module.exports = {
  getBaziData,
};
