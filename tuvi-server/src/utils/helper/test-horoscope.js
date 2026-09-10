const {
  getHoroscopeInfo,
  getTimelineInfoText,
  getMainInfoText,
} = require("./getMainInfo");

console.log(
  getMainInfoText({
    ngaySinh: 11, // Day of birth
    thangSinh: 1, // Month of birth
    namSinh: 1994, // Year of birth
    gioSinh: 18, // Hour of birth
    gioiTinh: -1, // Gender (1 for male, 0 for female)
    hoTen: "Nguyễn Minh Đức", // Name
    duongLich: true, // Is solar calendar
    timeZone: 7,
  })
);
console.log(
  getTimelineInfoText({
    ngaySinh: 11, // Day of birth
    thangSinh: 1, // Month of birth
    namSinh: 1994, // Year of birth
    gioSinh: 18, // Hour of birth
    gioiTinh: -1, // Gender (1 for male, 0 for female)
    hoTen: "Nguyễn Minh Đức", // Name
    duongLich: true, // Is solar calendar
    timeZone: 7,
  })
);

console.log(
  getTimelineInfoText({
    ngaySinh: 11, // Day of birth
    thangSinh: 1, // Month of birth
    namSinh: 1994, // Year of birth
    gioSinh: 18, // Hour of birth
    gioiTinh: -1, // Gender (1 for male, 0 for female)
    hoTen: "Nguyễn Minh Đức", // Name
    duongLich: true, // Is solar calendar
    timeZone: 7, // Timezone
    namXemTieuVan: 2024, // Year to analyze (annual)
    namXemDaiVan: 2024, // Year to analyze (decade)
    thangLuuNguyet: 3, // Month to analyze
    ngayLuuNhat: 15, // Day to analyze
  })
);
