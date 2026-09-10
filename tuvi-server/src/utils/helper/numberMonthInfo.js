const getNumberIndex = (daiVanIndex) => {
  switch (daiVanIndex) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 4:
      return "4th";
    case 5:
      return "5th";
    case 6:
      return "6th";
    case 7:
      return "7th";
    case 8:
      return "8th";
    case 9:
      return "9th";
    case 10:
      return "10th";
    case 11:
      return "11th";
    case 12:
      return "12th";
    default:
      return "";
  }
};

const getMonthName = (thangLuuNguyet) => {
  switch (thangLuuNguyet) {
    case "1":
      return "January";
    case "2":
      return "February";
    case "3":
      return "March";
    case "4":
      return "April";
    case "5":
      return "May";
    case "6":
      return "June";
    case "7":
      return "July";
    case "8":
      return "August";
    case "9":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    case "12":
      return "December";
    default:
      return "";
  }
};

const getNumberCanChi = (
  ngayLuuNhat,
  thangLuuNguyet,
  namXemTieuVan,
  namXemDaiVan
) => {
  if (ngayLuuNhat) {
    return 4;
  }
  if (thangLuuNguyet) {
    return 3;
  }
  if (namXemTieuVan) {
    return 2;
  }
  if (namXemDaiVan) {
    return 1;
  }
};

module.exports = {
  getNumberIndex,
  getMonthName,
  getNumberCanChi,
};
