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
  getThapThanNapAm,
} = require("./amDuong.js");

const tietData = require("../tiet.json");

// Helper function to calculate days between two dates
const calculateDaysBetween = (
  startDay,
  startMonth,
  startYear,
  endDay,
  endMonth,
  endYear
) => {
  // Create Date objects for both dates
  const startDate = new Date(startYear, startMonth - 1, startDay); // Month is 0-indexed in Date constructor
  const endDate = new Date(endYear, endMonth - 1, endDay);

  // Calculate the difference in milliseconds
  let timeDiff = endDate.getTime() - startDate.getTime();
  timeDiff = timeDiff >= 0 ? timeDiff : -timeDiff;

  // Convert milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
};

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

const getCanTangPercent = (diaChi, canNgay = null) => {
  let canTangIndex = {
    1: [
      { id: 10, name: "Quý", score: 46.65 },
      { id: 9, name: "Nhâm", score: 3.35 },
    ], // Tý: Quý,Nhâm
    2: [
      { id: 6, name: "Kỷ", score: 30 },
      { id: 8, name: "Tân", score: 15 },
      { id: 10, name: "Quý", score: 5 },
    ], // Sửu: Kỷ, Tân, Quý
    3: [
      { id: 1, name: "Giáp", score: 30 },
      { id: 3, name: "Bính", score: 15 },
      { id: 5, name: "Mậu", score: 5 },
    ], // Dần: Giáp, Bính, Mậu
    4: [
      { id: 2, name: "Ất", score: 46.35 },
      { id: 1, name: "Giáp", score: 3.35 },
    ], // Mão: Ất,Giáp
    5: [
      { id: 5, name: "Mậu", score: 46.65 },
      { id: 10, name: "Quý", score: 5 },
      { id: 2, name: "Ất", score: 3.35 },
    ], // Thìn: Mậu, Quý, Ất
    6: [
      { id: 3, name: "Bính", score: 30 },
      { id: 7, name: "Canh", score: 15 },
      { id: 5, name: "Mậu", score: 5 },
    ], // Tỵ: Bính, Canh, Mậu
    7: [
      { id: 4, name: "Đinh", score: 30 },
      { id: 6, name: "Kỷ", score: 20 },
    ], // Ngọ: Đinh, Kỷ
    8: [
      { id: 6, name: "Kỷ", score: 30 },
      { id: 2, name: "Ất", score: 15 },
      { id: 4, name: "Đinh", score: 5 },
    ], // Mùi: Kỷ, Ất, Đinh
    9: [
      { id: 7, name: "Canh", score: 30 },
      { id: 9, name: "Nhâm", score: 15 },
      { id: 5, name: "Mậu", score: 5 },
    ], // Thân: Canh, Nhâm, Mậu
    10: [
      { id: 8, name: "Tân", score: 46.65 },
      { id: 7, name: "Canh", score: 3.35 },
    ], // Dậu: Tân,Canh
    11: [
      { id: 5, name: "Mậu", score: 30 },
      { id: 4, name: "Đinh", score: 15 },
      { id: 8, name: "Tân", score: 5 },
    ], // Tuất: Mậu, Đinh, Tân
    12: [
      { id: 9, name: "Nhâm", score: 30 },
      { id: 1, name: "Giáp", score: 20 },
    ], // Hợi: Nhâm, Giáp
  };
  if (canNgay) {
    // Add thapThan field to each object in canTangIndex
    Object.keys(canTangIndex).forEach((key) => {
      canTangIndex[key] = canTangIndex[key].map((item) => ({
        ...item,
        thapThan: getThapThan(
          thienCan[item.id].nguHanh,
          thienCan[canNgay].nguHanh,
          thienCan[item.id].amDuong === thienCan[canNgay].amDuong
        ),
      }));
    });
  }
  return canTangIndex[diaChi];
};

const getCanTangScore = (diaChi, nguHanhScore) => {
  if (!diaChi) return nguHanhScore;
  let canTang = getCanTangPercent(diaChi);
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
  let chiList = [bazi.ngay.chi, bazi.thang.chi, bazi.nam.chi];
  let canList = [bazi.ngay.can, bazi.thang.can, bazi.nam.can];
  if (bazi.gio.can) {
    canList.push(bazi.gio.can);
  }
  if (bazi.gio.chi) {
    chiList.push(bazi.gio.chi);
  }
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
  const scale = 100000000; // scale càng lớn thì độ chính xác càng cao
  return Math.round(a * b * scale) / scale;
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
        { nguHanhId: 1, coefficient: 1.3 },
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

  let nguHanhScore = [
    {
      id: 1,
      name: "Kim",
      shortName: "K",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
      thapThan: [
        getThapThan(
          "K",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === -1
        ),
        getThapThan(
          "K",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === 1
        ),
      ],
    },
    {
      id: 2,
      name: "Mộc",
      shortName: "M",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
      thapThan: [
        getThapThan(
          "M",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === -1
        ),
        getThapThan(
          "M",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === 1
        ),
      ],
    },
    {
      id: 3,
      name: "Thủy",
      shortName: "T",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
      thapThan: [
        getThapThan(
          "T",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === -1
        ),
        getThapThan(
          "T",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === 1
        ),
      ],
    },
    {
      id: 4,
      name: "Hỏa",
      shortName: "H",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
      thapThan: [
        getThapThan(
          "H",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === -1
        ),
        getThapThan(
          "H",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === 1
        ),
      ],
    },
    {
      id: 5,
      name: "Thổ",
      shortName: "O",
      scoreAm: 0,
      scoreDuong: 0,
      total: 0,
      scale: 1,
      thapThan: [
        getThapThan(
          "O",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === -1
        ),
        getThapThan(
          "O",
          thienCan[canNgay].nguHanh,
          thienCan[canNgay].amDuong === 1
        ),
      ],
    },
  ];
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
  nguHanhScore = calculateEnergyScoreByChi(chiThoiVan, 50, nguHanhScore);
  nguHanhScore = calculateEnergyScoreByChi(chiNhatVan, 50, nguHanhScore);
  nguHanhScore = calculateEnergyScoreByChi(chiNguyetVan, 50, nguHanhScore);
  nguHanhScore = calculateEnergyScoreByChi(chiTieuVan, 50, nguHanhScore);
  nguHanhScore = calculateEnergyScoreByChi(chiDaiVan, 50, nguHanhScore);
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
    percentAm: (total === 0 ? 0 : (nh.scoreAm / total) * 100).toFixed(2),
    percentDuong: (total === 0 ? 0 : (nh.scoreDuong / total) * 100).toFixed(2),
    percent: (total === 0 ? 0 : (nh.total / total) * 100).toFixed(2),
  }));
};

const dichCanChi = (index, space, period) => {
  let newIndex = index + space;
  if (newIndex <= 0) {
    newIndex = newIndex + period;
  } else if (newIndex > period) {
    newIndex = newIndex - period;
  }
  return newIndex;
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
  if (gioSinh === 13) {
    [ngaySinh, thangSinh, namSinh] = getNextDay(
      ngaySinh,
      thangSinh,
      namSinh,
      duongLich
    );
    gioSinh = 1;
  }
  if (gioThoiVan === 13) {
    [ngayLuuNhat, thangLuuNguyet, namXemTieuVan] = getNextDay(
      ngayLuuNhat,
      thangLuuNguyet,
      namXemTieuVan,
      duongLich
    );
    gioThoiVan = 1;
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

const getViTriSao = (saoID, thapNhiCung) => {
  let cungSaoIndex = thapNhiCung.findIndex((cung) =>
    cung.cungSao.some((sao) => sao.saoID === saoID)
  );
  return cungSaoIndex;
};

const getTuHoaBazi = (can, thapNhiCung, endName) => {
  let viTriHoaLoc, viTriHoaQuyen, viTriHoaKhoa, viTriHoaKy;
  let viTriLiemTrinh = getViTriSao(2, thapNhiCung);
  let viTriPhaQuan = getViTriSao(14, thapNhiCung);
  let viTriVuKhuc = getViTriSao(4, thapNhiCung);
  let vitriThaiDuong = getViTriSao(5, thapNhiCung);
  let viTriThienCo = getViTriSao(6, thapNhiCung);
  let viTriThienLuong = getViTriSao(12, thapNhiCung);
  let viTriTuVi = getViTriSao(1, thapNhiCung);
  let viTriThaiAm = getViTriSao(8, thapNhiCung);
  let viTriThamLang = getViTriSao(9, thapNhiCung);
  let viTriCuMon = getViTriSao(10, thapNhiCung);
  let viTriThienDong = getViTriSao(3, thapNhiCung);
  let viTriVanKhuc = getViTriSao(58, thapNhiCung);
  let viTriVanXuong = getViTriSao(57, thapNhiCung);
  let viTriTaPhu = getViTriSao(61, thapNhiCung);
  let viTriHuuBat = getViTriSao(62, thapNhiCung);

  switch (can) {
    case 1:
      viTriHoaLoc = viTriLiemTrinh;
      viTriHoaQuyen = viTriPhaQuan;
      viTriHoaKhoa = viTriVuKhuc;
      viTriHoaKy = vitriThaiDuong;
      break;
    case 2:
      viTriHoaLoc = viTriThienCo;
      viTriHoaQuyen = viTriThienLuong;
      viTriHoaKhoa = viTriTuVi;
      viTriHoaKy = viTriThaiAm;
      break;
    case 3:
      viTriHoaLoc = viTriThienDong;
      viTriHoaQuyen = viTriThienCo;
      viTriHoaKhoa = viTriVanXuong;
      viTriHoaKy = viTriLiemTrinh;
      break;
    case 4:
      viTriHoaLoc = viTriThaiAm;
      viTriHoaQuyen = viTriThienDong;
      viTriHoaKhoa = viTriThienCo;
      viTriHoaKy = viTriCuMon;
      break;
    case 5:
      viTriHoaLoc = viTriThamLang;
      viTriHoaQuyen = viTriThaiAm;
      viTriHoaKhoa = viTriHuuBat;
      viTriHoaKy = viTriThienCo;
      break;
    case 6:
      viTriHoaLoc = viTriVuKhuc;
      viTriHoaQuyen = viTriThamLang;
      viTriHoaKhoa = viTriThienLuong;
      viTriHoaKy = viTriVanKhuc;
      break;
    case 7:
      viTriHoaLoc = vitriThaiDuong;
      viTriHoaQuyen = viTriVuKhuc;
      viTriHoaKhoa = viTriThaiAm;
      viTriHoaKy = viTriThienDong;
      break;
    case 8:
      viTriHoaLoc = viTriCuMon;
      viTriHoaQuyen = vitriThaiDuong;
      viTriHoaKhoa = viTriVanKhuc;
      viTriHoaKy = viTriVanXuong;
      break;
    case 9:
      viTriHoaLoc = viTriThienLuong;
      viTriHoaQuyen = viTriTuVi;
      viTriHoaKhoa = viTriTaPhu;
      viTriHoaKy = viTriVuKhuc;
      break;
    case 10:
      viTriHoaLoc = viTriPhaQuan;
      viTriHoaQuyen = viTriCuMon;
      viTriHoaKhoa = viTriThaiAm;
      viTriHoaKy = viTriThamLang;
      break;
  }

  thapNhiCung[viTriHoaLoc].cungSao.push({
    saoID: 94,
    saoTen: `Hóa lộc (từ Can Trụ ${endName})`,
  });
  thapNhiCung[viTriHoaQuyen].cungSao.push({
    saoID: 93,
    saoTen: `Hóa quyền (từ Can Trụ ${endName})`,
  });
  thapNhiCung[viTriHoaKhoa].cungSao.push({
    saoID: 92,
    saoTen: `Hóa khoa (từ Can Trụ ${endName})`,
  });
  thapNhiCung[viTriHoaKy].cungSao.push({
    saoID: 95,
    saoTen: `Hóa kỵ (từ Can Trụ ${endName})`,
  });
};

const addTuHoaBazi = (
  canGio,
  canNgay,
  canThang,
  canNam,
  canDaiVan,
  canTieuVan,
  canNguyetVan,
  canNhatVan,
  canThoiVan,
  thapNhiCung
) => {
  let data = [
    {
      can: canGio,
      endName: "Giờ/Chính",
    },
    {
      can: canNgay,
      endName: "Ngày/Chính",
    },
    {
      can: canThang,
      endName: "Tháng/Chính",
    },
    {
      can: canNam,
      endName: "Năm/Chính",
    },
    {
      can: canDaiVan,
      endName: "Đại Vận/Biến",
    },
    {
      can: canTieuVan,
      endName: "Năm/Biến",
    },
    {
      can: canNguyetVan,
      endName: "Tháng/Biến",
    },
    {
      can: canNhatVan,
      endName: "Ngày/Biến",
    },
    {
      can: canThoiVan,
      endName: "Giờ/Biến",
    },
  ];
  for (let item of data) {
    if (item.can) {
      getTuHoaBazi(item.can, thapNhiCung, item.endName);
    }
  }
};

const getChiThangBatTu = (ngaySinh, thangSinh, yearData) => {
  let tietIndex = yearData.canhTiet.findIndex(
    (item) => item.month === thangSinh
  );
  if (ngaySinh < yearData.canhTiet[tietIndex].startDate) {
    tietIndex = (tietIndex - 1 + 12) % 12;
  }
  let thang = yearData.canhTiet[tietIndex].month;
  switch (thang) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 5;
    case 5:
      return 6;
    case 6:
      return 7;
    case 7:
      return 8;
    case 8:
      return 9;
    case 9:
      return 10;
    case 10:
      return 11;
    case 11:
      return 12;
    case 12:
      return 1;
  }
};

const getCanThangBatTu = (chiThang, canNam) => {
  let canThangDan;
  switch (canNam) {
    case 1:
    case 6:
      canThangDan = 3;
      break;
    case 2:
    case 7:
      canThangDan = 5;
      break;
    case 3:
    case 8:
      canThangDan = 7;
      break;
    case 4:
    case 9:
      canThangDan = 9;
      break;
    case 5:
    case 10:
      canThangDan = 1;
      break;
  }
  let khoangCach = (chiThang - 3 + 12) % 12;
  let canThang = (khoangCach + canThangDan) % 10 || 10;
  return canThang;
};

const calculateCanChiThangBatTu = (baseInfo, canNam, yearData) => {
  let chiThang = getChiThangBatTu(
    baseInfo.ngaySinh,
    baseInfo.thangSinh,
    yearData
  );
  let canThang = getCanThangBatTu(chiThang, canNam);
  return {
    canThang,
    chiThang: (chiThang - 2 + 12) % 12 || 12,
  };
};

const getBaziData = (baseInfo, thapNhiCung, boTruGio, onlyDecade) => {
  let originHour, canGioSinh, chiGioSinh, canGioSinhTen, chiGioSinhTen;
  baseInfo.boTruGio = boTruGio;
  if (!boTruGio) {
    originHour = baseInfo.gioSinh;
    baseInfo = convertHourInfo(baseInfo);
    chiGioSinh = diaChi[baseInfo.gioSinh];
    canGioSinh =
      ((((jdFromDate(baseInfo.ngaySinh, baseInfo.thangSinh, baseInfo.namSinh) -
        1) *
        2) %
        10) +
        baseInfo.gioSinh) %
      10;
    if (canGioSinh === 0) {
      canGioSinh = 10;
    }
    canGioSinhTen = thienCan[canGioSinh].tenCan;
    chiGioSinhTen = chiGioSinh.tenChi;
  }
  let amLich = S2L(
    baseInfo.ngaySinh,
    baseInfo.thangSinh,
    baseInfo.namSinh,
    baseInfo.timeZone
  );
  const ngayResult = canChiNgay(
    baseInfo.ngaySinh,
    baseInfo.thangSinh,
    baseInfo.namSinh,
    baseInfo.duongLich,
    baseInfo.timeZone
  );
  let canNgay = ngayResult[0];
  let chiNgay = ngayResult[1];

  let canChiAmLich = ngayThangNamCanChi(amLich[0], amLich[1], amLich[2], false);
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
  let decadeIndex;
  let amLichVan;
  let canThang = canChiAmLich[0];
  let chiThang = amLich[1];
  let canNam = canChiAmLich[1];
  let chiNam = canChiAmLich[2];
  const yearData = tietData.find((item) => item.year === baseInfo.namSinh);
  canThang = calculateCanChiThangBatTu(baseInfo, canNam, yearData).canThang;
  chiThang = calculateCanChiThangBatTu(baseInfo, canNam, yearData).chiThang;
  let yearStartDecade;
  if (baseInfo.namXemTieuVan) {
    if (!onlyDecade) {
      amLichVan = S2L(
        baseInfo.ngayLuuNhat ? baseInfo.ngayLuuNhat : 15,
        baseInfo.thangLuuNguyet ? baseInfo.thangLuuNguyet : 5,
        baseInfo.namXemTieuVan ? baseInfo.namXemTieuVan : 1,
        baseInfo.timeZone
      );
      if (baseInfo.gioThoiVan) {
        chiThoiVan = diaChi[baseInfo.gioThoiVan].id;
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
      if (baseInfo.ngayLuuNhat) {
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
        false
      );
      if (baseInfo.thangLuuNguyet) {
        canNguyetVan = canChiAmLichVan[0];
        chiNguyetVan = amLichVan[1];
      }
      canTieuVan = canChiAmLichVan[1];
      chiTieuVan = canChiAmLichVan[2];
    }
    let tuoi = baseInfo.namXemTieuVan - baseInfo.namSinh;
    if (!boTruGio) {
      let cungDaiVan = null;
      for (let cung of thapNhiCung) {
        if (
          (cung.cungDaiHan < 10 && tuoi < 10) ||
          (cung.cungDaiHan - 1 <= tuoi && cung.cungDaiHan + 9 > tuoi)
        ) {
          cungDaiVan = cung;
          decadeIndex = Math.ceil(cung.cungDaiHan / 10);
        }
      }
      canDaiVan = cungDaiVan.cungCan;
      chiDaiVan = cungDaiVan.cungSo;
      if (tuoi < cungDaiVan.cungDaiHan % 10) {
        decadeIndex = 0;
      }
      yearStartDecade = baseInfo.namSinh + (cungDaiVan.cungDaiHan % 10);
    } else {
      if (yearData) {
        let amDuongNamSinh = thienCan[canChiAmLich[1]].amDuong;
        const amDuongNamNu = baseInfo.gioiTinh * amDuongNamSinh;
        let tietInYear = yearData.canhTiet;
        let nextTietIndex = tietInYear.findIndex(
          (item) => item.month === baseInfo.thangSinh
        );
        if (amDuongNamNu === 1) {
          if (baseInfo.ngaySinh > tietInYear[nextTietIndex].startDate) {
            nextTietIndex = (nextTietIndex + 1) % 12;
          }
        } else {
          if (baseInfo.ngaySinh < tietInYear[nextTietIndex].startDate) {
            nextTietIndex = (nextTietIndex - 1 + 12) % 12;
          }
        }

        let tietData = tietInYear[nextTietIndex];

        let daysBetween = calculateDaysBetween(
          baseInfo.ngaySinh,
          baseInfo.thangSinh,
          baseInfo.namSinh,
          tietData.startDate,
          tietData.month,
          baseInfo.namSinh
        );
        let ageStartDecade = Math.floor(daysBetween / 3);
        decadeIndex = Math.floor((tuoi - ageStartDecade) / 10) + 1;
        yearStartDecade = ageStartDecade + baseInfo.namSinh;
        canDaiVan =
          amDuongNamNu === 1
            ? dichCanChi(canThang, decadeIndex, 10)
            : dichCanChi(canThang, -decadeIndex, 10);
        chiDaiVan =
          amDuongNamNu === 1
            ? dichCanChi(chiThang + 2, decadeIndex, 12)
            : dichCanChi(chiThang + 2, -decadeIndex, 12);
      }
    }
  }
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
  let nguHanhScoreGoc = calcNguHanhScore({
    gio: { can: canGioSinh, chi: boTruGio ? undefined : baseInfo.gioSinh },
    ngay: { can: canNgay, chi: chiNgay },
    thang: { can: canThang, chi: getIndex(chiThang + 2) },
    nam: { can: canNam, chi: chiNam },
    thoiVan: {},
    nhatVan: {},
    nguyetVan: {},
    tieuVan: {},
    daiVan: {},
  });
  let nguHanhScore = calcNguHanhScore({
    gio: { can: canGioSinh, chi: boTruGio ? undefined : baseInfo.gioSinh },
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
  addTuHoaBazi(
    canGioSinh,
    canNgay,
    canThang,
    canNam,
    canDaiVan,
    canTieuVan,
    canNguyetVan,
    canNhatVan,
    canThoiVan,
    thapNhiCung
  );

  return {
    baseInfo: { ...baseInfo, onlyDecade },
    thapNhiCung: thapNhiCung,
    nguHanhScoreGoc,
    nguHanhScore,
    hour: !boTruGio
      ? {
          can: canGioSinhTen,
          chi: chiGioSinhTen,
          name: gioAmTen,
          solarValue: originHour,
          lunarValue: chiGioSinhTen,
          nguHanhNapAm: nguHanhNapAm(baseInfo.gioSinh, canGioSinh, true),
          nguHanhNapAmThapThan: getThapThanNapAm(
            nguHanhNapAm(baseInfo.gioSinh, canGioSinh, false),
            thienCan[canNgay].nguHanh
          ),
          nguHanhCan: nguHanh(thienCan[canGioSinh].nguHanh).tenHanh,
          nguHanhChi: nguHanh(diaChi[baseInfo.gioSinh].tenHanh).tenHanh,
          canTang: getCanTang(baseInfo.gioSinh),
          canTangPercent: getCanTangPercent(baseInfo.gioSinh, canNgay),
          thapThan: getThapThan(
            thienCan[canGioSinh].nguHanh,
            thienCan[canNgay].nguHanh,
            thienCan[canGioSinh].amDuong === thienCan[canNgay].amDuong
          ),
        }
      : undefined,
    day: {
      can: canNgayTen,
      chi: chiNgayTen,
      name: ngayAmTen,
      solarValue: baseInfo.ngaySinh,
      lunarValue: amLich[0],
      nguHanhNapAm: nguHanhNapAm(chiNgay, canNgay, true),
      nguHanhNapAmThapThan:
        "Nhật chủ, " +
        getThapThanNapAm(
          nguHanhNapAm(chiNgay, canNgay, false),
          thienCan[canNgay].nguHanh
        ),
      nguHanhCan: nguHanh(thienCan[canNgay].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[chiNgay].tenHanh).tenHanh,
      canTang: getCanTang(chiNgay),
      canTangPercent: getCanTangPercent(chiNgay, canNgay),
      thapThan: "Nhật chủ",
    },
    month: {
      can: canThangTen,
      chi: chiThangTen,
      name: thangAmTen,
      solarValue: baseInfo.thangSinh,
      lunarValue: amLich[1],
      nguHanhNapAm: nguHanhNapAm(getIndex(chiThang + 2), canThang, true),
      nguHanhNapAmThapThan: getThapThanNapAm(
        nguHanhNapAm(getIndex(chiThang + 2), canThang, false),
        thienCan[canNgay].nguHanh
      ),
      nguHanhCan: nguHanh(thienCan[canThang].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[getIndex(chiThang + 2)].tenHanh).tenHanh,
      canTang: getCanTang(getIndex(chiThang + 2)),
      canTangPercent: getCanTangPercent(getIndex(chiThang + 2), canNgay),
      thapThan: getThapThan(
        thienCan[canThang].nguHanh,
        thienCan[canNgay].nguHanh,
        thienCan[canThang].amDuong === thienCan[canNgay].amDuong
      ),
    },
    year: {
      can: canNamTen,
      chi: chiNamTen,
      name: namAmTen,
      solarValue: baseInfo.namSinh,
      lunarValue: amLich[2],
      nguHanhNapAm: nguHanhNapAm(chiNam, canNam, true),
      nguHanhNapAmThapThan: getThapThanNapAm(
        nguHanhNapAm(chiNam, canNam, false),
        thienCan[canNgay].nguHanh
      ),
      nguHanhCan: nguHanh(thienCan[canNam].nguHanh).tenHanh,
      nguHanhChi: nguHanh(diaChi[chiNam].tenHanh).tenHanh,
      canTang: getCanTang(chiNam),
      canTangPercent: getCanTangPercent(chiNam, canNgay),
      thapThan: getThapThan(
        thienCan[canNam].nguHanh,
        thienCan[canNgay].nguHanh,
        thienCan[canNam].amDuong === thienCan[canNgay].amDuong
      ),
    },
    daiVan: baseInfo.namXemTieuVan
      ? {
          name: thienCan[canDaiVan].tenCan + " " + diaChi[chiDaiVan].tenChi,
          can: thienCan[canDaiVan].tenCan,
          chi: diaChi[chiDaiVan].tenChi,
          nguHanhNapAm: nguHanhNapAm(chiDaiVan, canDaiVan, true),
          nguHanhCan: nguHanh(thienCan[canDaiVan].nguHanh).tenHanh,
          nguHanhChi: nguHanh(diaChi[chiDaiVan].tenHanh).tenHanh,
          canTang: getCanTang(chiDaiVan),
          canTangPercent: getCanTangPercent(chiDaiVan, canNgay),
          thapThan: getThapThan(
            thienCan[canDaiVan].nguHanh,
            thienCan[canNgay].nguHanh,
            thienCan[canDaiVan].amDuong === thienCan[canNgay].amDuong
          ),
          decadeIndex,
          yearStartDecade,
        }
      : undefined,
    tieuVan:
      baseInfo.namXemTieuVan && !onlyDecade
        ? {
            name: thienCan[canTieuVan].tenCan + " " + diaChi[chiTieuVan].tenChi,
            can: thienCan[canTieuVan].tenCan,
            chi: diaChi[chiTieuVan].tenChi,
            nguHanhNapAm: nguHanhNapAm(chiTieuVan, canTieuVan, true),
            nguHanhCan: nguHanh(thienCan[canTieuVan].nguHanh).tenHanh,
            nguHanhChi: nguHanh(diaChi[chiTieuVan].tenHanh).tenHanh,
            canTang: getCanTang(chiTieuVan),
            canTangPercent: getCanTangPercent(chiTieuVan, canNgay),
            thapThan: getThapThan(
              thienCan[canTieuVan].nguHanh,
              thienCan[canNgay].nguHanh,
              thienCan[canTieuVan].amDuong === thienCan[canNgay].amDuong
            ),
          }
        : undefined,
    nguyetVan:
      baseInfo.thangLuuNguyet && baseInfo.namXemTieuVan && !onlyDecade
        ? {
            name:
              thienCan[canNguyetVan].tenCan +
              " " +
              diaChi[getIndex(chiNguyetVan + 2)].tenChi,
            can: thienCan[canNguyetVan].tenCan,
            chi: diaChi[getIndex(chiNguyetVan + 2)].tenChi,
            nguHanhNapAm: nguHanhNapAm(
              getIndex(chiNguyetVan + 2),
              canNguyetVan,
              true
            ),
            nguHanhCan: nguHanh(thienCan[canNguyetVan].nguHanh).tenHanh,
            nguHanhChi: nguHanh(diaChi[getIndex(chiNguyetVan + 2)].tenHanh)
              .tenHanh,
            canTang: getCanTang(getIndex(chiNguyetVan + 2)),
            canTangPercent: getCanTangPercent(
              getIndex(chiNguyetVan + 2),
              canNgay
            ),
            thapThan: getThapThan(
              thienCan[canNguyetVan].nguHanh,
              thienCan[canNgay].nguHanh,
              thienCan[canNguyetVan].amDuong === thienCan[canNgay].amDuong
            ),
          }
        : undefined,
    nhatVan:
      baseInfo.ngayLuuNhat &&
      baseInfo.thangLuuNguyet &&
      baseInfo.namXemTieuVan &&
      !onlyDecade
        ? {
            name: thienCan[canNhatVan].tenCan + " " + diaChi[chiNhatVan].tenChi,
            can: thienCan[canNhatVan].tenCan,
            chi: diaChi[chiNhatVan].tenChi,
            nguHanhNapAm: nguHanhNapAm(chiNhatVan, canNhatVan, true),
            nguHanhCan: nguHanh(thienCan[canNhatVan].nguHanh).tenHanh,
            nguHanhChi: nguHanh(diaChi[chiNhatVan].tenHanh).tenHanh,
            canTang: getCanTang(chiNhatVan),
            canTangPercent: getCanTangPercent(chiNhatVan, canNgay),
            thapThan: getThapThan(
              thienCan[canNhatVan].nguHanh,
              thienCan[canNgay].nguHanh,
              thienCan[canNhatVan].amDuong === thienCan[canNgay].amDuong
            ),
          }
        : undefined,
    thoiVan:
      baseInfo.gioThoiVan &&
      baseInfo.ngayLuuNhat &&
      baseInfo.thangLuuNguyet &&
      baseInfo.namXemTieuVan &&
      !onlyDecade
        ? {
            name: thienCan[canThoiVan].tenCan + " " + diaChi[chiThoiVan].tenChi,
            can: thienCan[canThoiVan].tenCan,
            chi: diaChi[chiThoiVan].tenChi,
            nguHanhNapAm: nguHanhNapAm(chiThoiVan, canThoiVan, true),
            nguHanhCan: nguHanh(thienCan[canThoiVan].nguHanh).tenHanh,
            nguHanhChi: nguHanh(diaChi[chiThoiVan].tenHanh).tenHanh,
            canTang: getCanTang(chiThoiVan),
            canTangPercent: getCanTangPercent(chiThoiVan, canNgay),
            thapThan: getThapThan(
              thienCan[canThoiVan].nguHanh,
              thienCan[canNgay].nguHanh,
              thienCan[canThoiVan].amDuong === thienCan[canNgay].amDuong
            ),
          }
        : undefined,
  };
};

module.exports = {
  getBaziData,
};
