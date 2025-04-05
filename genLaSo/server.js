const express = require("express");
const path = require("path");
const moment = require("moment");
const app = express();
const port = 3000;

// Serve static files from the static directory
app.use("/static", express.static("static"));
app.use(express.json());

const { lapDiaBan } = require("./helper/lapDiaBan");
const LapThienBan = require("./helper/thienban");
const diaBan = require("./helper/diaBan");
const { getNextDay } = require("./helper/amDuong");

app.get("/api", (req, res) => {
  try {
    const now = moment();
    const hoTen = req.query.hoten || "";
    let gioSinh = parseInt(req.query.giosinh) || 1;
    let ngaySinh = parseInt(req.query.ngaysinh) || now.date();
    let thangSinh = parseInt(req.query.thangsinh) || now.month() + 1;
    let namSinh = parseInt(req.query.namsinh) || now.year();
    const duongLich = req.query.amlich === "on" ? false : true;

    if (gioSinh === 13) {
      gioSinh = 1;
      [ngaySinh, thangSinh, namSinh] = getNextDay(
        ngaySinh,
        thangSinh,
        namSinh,
        duongLich
      );
    }
    const gioiTinh = req.query.gioitinh === "nam" ? 1 : -1;
    const timeZone = parseInt(req.query.muigio) || 7;
    const luunien = req.query.luunien === "on" ? true : false;
    const namXemTieuVan = parseInt(req.query.namxemtieuvan) || now.year();
    const thangLuuNguyet = parseInt(req.query.thangluunguyet) || null;
    const ngayLuuNhat = parseInt(req.query.ngayluunhat) || null;
    const daivan = req.query.daivan === "on" ? true : false;
    const namXemDaiVan = parseInt(req.query.namxemdaivan) || now.year();
    // Gọi các hàm xử lý
    const data = lapDiaBan(
      diaBan,
      ngaySinh,
      thangSinh,
      namSinh,
      gioSinh,
      gioiTinh,
      duongLich,
      timeZone,
      luunien ? namXemTieuVan : 0,
      daivan ? namXemDaiVan : 0,
      thangLuuNguyet,
      ngayLuuNhat
    );
    const thienBan = new LapThienBan(
      ngaySinh,
      thangSinh,
      namSinh,
      gioSinh,
      gioiTinh,
      hoTen,
      data,
      duongLich,
      7,
      luunien ? namXemTieuVan : 0
    );
    let luuNguyet = [];
    let luuNhat = [];

    const laso = {
      thienBan: thienBan,
      thapNhiCung: data.thapNhiCung,
      maCanChiDaiVan: data.maCanChiDaivan,
      maCanChiTieuVan: data.maCanChiTieuVan,
      maCanChiNguyetVan: data.maCanChiNguyetVan,
      maCanChiNhatVan: data.maCanChiNhatVan,
    };

    res.json(laso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//         "Tý": "Thủy", "Sửu": "Thổ", "Dần": "Hỏa", "Mão": "Hỏa",
//         "Thìn": "Thổ", "Tỵ": "Hỏa", "Ngọ": "Hỏa", "Mùi": "Thổ",
//         "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Thủy"
//     },
//     "Bính, Đinh (Hỏa)": {
//         "Tý": "Thủy", "Sửu": "Thủy", "Dần": "Thổ", "Mão": "Thổ",
//         "Thìn": "Thổ", "Tỵ": "Hỏa", "Ngọ": "Hỏa", "Mùi": "Thổ",
//         "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Thủy"
//     },
//     "Mậu, Kỷ (Thổ)": {
//         "Tý": "Hỏa", "Sửu": "Hỏa", "Dần": "Mộc", "Mão": "Mộc",
//         "Thìn": "Thổ", "Tỵ": "Hỏa", "Ngọ": "Hỏa", "Mùi": "Thổ",
//         "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Mộc"
//     },
//     "Canh, Tân (Kim)": {
//         "Tý": "Thổ", "Sửu": "Thổ", "Dần": "Mộc", "Mão": "Mộc",
//         "Thìn": "Thổ", "Tỵ": "Hỏa", "Ngọ": "Hỏa", "Mùi": "Thổ",
//         "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Mộc"
//     },
//     "Nhâm, Quý (Thủy)": {
//         "Tý": "Mộc", "Sửu": "Thổ", "Dần": "Hỏa", "Mão": "Hỏa",
//         "Thìn": "Thổ", "Tỵ": "Hỏa", "Ngọ": "Hỏa", "Mùi": "Thổ",
//         "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Mộc"
//     }
// }

//Bước 1: Xác định ngày, giờ, tháng, năm sinh chính xác
const diaChiThang = {
  thang1: "Dần",
  thang2: "Mão",
  thang3: "Thìn",
  thang4: "Tỵ",
  thang5: "Ngọ",
  thang6: "Mùi",
  thang7: "Thân",
  thang8: "Dậu",
  thang9: "Tuất",
  thang10: "Hợi",
  thang11: "Tý",
  thang12: "Sửu",
};

const diaChiGio = {
  "23-1h": "Tý",
  "1h-3h": "Sửu",
  "3h-5h": "Dần",
  "5h-7h": "Mão",
  "7h-9h": "Thìn",
  "9h-11h": "Tỵ",
  "11h-13h": "Ngọ",
  "13h-15h": "Mùi",
  "15h-17h": "Thân",
  "17h-19h": "Dậu",
  "19h-21h": "Tuất",
  "21h-23h": "Hợi",
};

const thienCan = [
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
]; // cách xác định số cuối năm sinh, phần tử chẵn là năm dương, phần tử lẻ là năm âm

const diaChiNam = [
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
]; // cách xác định năm sinh / 12 => số dư

//=> thienCan + DiaChi => Menh60Nam
const mapMenh60Nam = {
  "Giáp Tý": "Hải Trung Kim",
  "Ất Sửu": "Hải Trung Kim",
  "Bính Dần": "Lư Trung Hỏa",
  "Đinh Mão": "Lư Trung Hỏa",
  "Mậu Thìn": "Đại Lâm Mộc",
  "Kỷ Tỵ": "Đại Lâm Mộc",
  "Canh Ngọ": "Lộ Bàng Thổ",
  "Tân Mùi": "Lộ Bàng Thổ",
  "Nhâm Thân": "Kiếm Phong Kim",
  "Quý Dậu": "Kiếm Phong Kim",
  "Giáp Tuất": "Sơn Đầu Hỏa",
  "Ất Hợi": "Sơn Đầu Hỏa",
  "Bính Tý": "Giản Hạ Thủy",
  "Đinh Sửu": "Giản Hạ Thủy",
  "Mậu Dần": "Thành Đầu Thổ",
  "Kỷ Mão": "Thành Đầu Thổ",
  "Canh Thìn": "Bạch Lạp Kim",
  "Tân Tỵ": "Bạch Lạp Kim",
  "Nhâm Ngọ": "Dương Liễu Mộc",
  "Quý Mùi": "Dương Liễu Mộc",
  "Giáp Thân": "Tuyền Trung Thủy",
  "Ất Dậu": "Tuyền Trung Thủy",
  "Bính Tuất": "Ốc Thượng Thổ",
  "Đinh Hợi": "Ốc Thượng Thổ",
  "Mậu Tý": "Tích Lịch Hỏa",
  "Kỷ Sửu": "Tích Lịch Hỏa",
  "Canh Dần": "Tùng Bách Mộc",
  "Tân Mão": "Tùng Bách Mộc",
  "Nhâm Thìn": "Trường Lưu Thủy",
  "Quý Tỵ": "Trường Lưu Thủy",
  "Giáp Ngọ": "Sa Trung Kim",
  "Ất Mùi": "Sa Trung Kim",
  "Bính Thân": "Sơn Hạ Hỏa",
  "Đinh Dậu": "Sơn Hạ Hỏa",
  "Mậu Tuất": "Bình Địa Mộc",
  "Kỷ Hợi": "Bình Địa Mộc",
  "Canh Tý": "Bích Thượng Thổ",
  "Tân Sửu": "Bích Thượng Thổ",
  "Nhâm Dần": "Kim Bạch Kim",
  "Quý Mão": "Kim Bạch Kim",
  "Giáp Thìn": "Phú Đăng Hỏa",
  "Ất Tỵ": "Phú Đăng Hỏa",
  "Bính Ngọ": "Thiên Hà Thủy",
  "Đinh Mùi": "Thiên Hà Thủy",
  "Mậu Thân": "Đại Trạch Thổ",
  "Kỷ Dậu": "Đại Trạch Thổ",
  "Canh Tuất": "Thoa Xuyến Kim",
  "Tân Hợi": "Thoa Xuyến Kim",
  "Nhâm Tý": "Tang Đố Mộc",
  "Quý Sửu": "Tang Đố Mộc",
  "Giáp Dần": "Đại Khê Thủy",
  "Ất Mão": "Đại Khê Thủy",
  "Bính Thìn": "Sa Trung Thổ",
  "Đinh Tỵ": "Sa Trung Thổ",
  "Mậu Ngọ": "Thiên Thượng Hỏa",
  "Kỷ Mùi": "Thiên Thượng Hỏa",
  "Canh Thân": "Thạch Lựu Mộc",
  "Tân Dậu": "Thạch Lựu Mộc",
  "Nhâm Tuất": "Đại Hải Thủy",
  "Quý Hợi": "Đại Hải Thủy",
};

const dataCungMenh = {
  Dần: {
    Tý: "Dần",
    Sửu: "Mão",
    Dần: "Thìn",
    Mão: "Tỵ",
    Thìn: "Ngọ",
    Tỵ: "Mùi",
    Ngọ: "Thân",
    Mùi: "Dậu",
    Thân: "Tuất",
    Dậu: "Hợi",
    Tuất: "Tý",
    Hợi: "Sửu",
  },
  Mão: {
    Tý: "Mão",
    Sửu: "Thìn",
    Dần: "Tỵ",
    Mão: "Ngọ",
    Thìn: "Mùi",
    Tỵ: "Thân",
    Ngọ: "Dậu",
    Mùi: "Tuất",
    Thân: "Hợi",
    Dậu: "Tý",
    Tuất: "Sửu",
    Hợi: "Dần",
  },
  Thìn: {
    Tý: "Thìn",
    Sửu: "Tỵ",
    Dần: "Ngọ",
    Mão: "Mùi",
    Thìn: "Thân",
    Tỵ: "Dậu",
    Ngọ: "Tuất",
    Mùi: "Hợi",
    Thân: "Tý",
    Dậu: "Sửu",
    Tuất: "Dần",
    Hợi: "Mão",
  },
  Tỵ: {
    Tý: "Tỵ",
    Sửu: "Ngọ",
    Dần: "Mùi",
    Mão: "Thân",
    Thìn: "Dậu",
    Tỵ: "Tuất",
    Ngọ: "Hợi",
    Mùi: "Tý",
    Thân: "Sửu",
    Dậu: "Dần",
    Tuất: "Mão",
    Hợi: "Thìn",
  },
  Ngọ: {
    Tý: "Ngọ",
    Sửu: "Mùi",
    Dần: "Thân",
    Mão: "Dậu",
    Thìn: "Tuất",
    Tỵ: "Hợi",
    Ngọ: "Tý",
    Mùi: "Sửu",
    Thân: "Dần",
    Dậu: "Mão",
    Tuất: "Thìn",
    Hợi: "Tỵ",
  },
  Mùi: {
    Tý: "Mùi",
    Sửu: "Thân",
    Dần: "Dậu",
    Mão: "Tuất",
    Thìn: "Hợi",
    Tỵ: "Tý",
    Ngọ: "Sửu",
    Mùi: "Dần",
    Thân: "Mão",
    Dậu: "Thìn",
    Tuất: "Tỵ",
    Hợi: "Ngọ",
  },
  Thân: {
    Tý: "Thân",
    Sửu: "Dậu",
    Dần: "Tuất",
    Mão: "Hợi",
    Thìn: "Tý",
    Tỵ: "Sửu",
    Ngọ: "Dần",
    Mùi: "Mão",
    Thân: "Thìn",
    Dậu: "Tỵ",
    Tuất: "Ngọ",
    Hợi: "Mùi",
  },
  Dậu: {
    Tý: "Dậu",
    Sửu: "Tuất",
    Dần: "Hợi",
    Mão: "Tý",
    Thìn: "Sửu",
    Tỵ: "Dần",
    Ngọ: "Mão",
    Mùi: "Thìn",
    Thân: "Tỵ",
    Dậu: "Ngọ",
    Tuất: "Mùi",
    Hợi: "Thân",
  },
  Tuất: {
    Tý: "Tuất",
    Sửu: "Hợi",
    Dần: "Tý",
    Mão: "Sửu",
    Thìn: "Dần",
    Tỵ: "Mão",
    Ngọ: "Thìn",
    Mùi: "Tỵ",
    Thân: "Ngọ",
    Dậu: "Mùi",
    Tuất: "Thân",
    Hợi: "Dậu",
  },
  Hợi: {
    Tý: "Hợi",
    Sửu: "Tý",
    Dần: "Sửu",
    Mão: "Dần",
    Thìn: "Mão",
    Tỵ: "Thìn",
    Ngọ: "Tỵ",
    Mùi: "Ngọ",
    Thân: "Mùi",
    Dậu: "Thân",
    Tuất: "Dậu",
    Hợi: "Tuất",
  },
  Tý: {
    Tý: "Tý",
    Sửu: "Sửu",
    Dần: "Dần",
    Mão: "Mão",
    Thìn: "Thìn",
    Tỵ: "Tỵ",
    Ngọ: "Ngọ",
    Mùi: "Mùi",
    Thân: "Thân",
    Dậu: "Dậu",
    Tuất: "Tuất",
    Hợi: "Hợi",
  },
  Sửu: {
    Tý: "Sửu",
    Sửu: "Dần",
    Dần: "Mão",
    Mão: "Thìn",
    Thìn: "Tỵ",
    Tỵ: "Ngọ",
    Ngọ: "Mùi",
    Mùi: "Thân",
    Thân: "Dậu",
    Dậu: "Tuất",
    Tuất: "Hợi",
    Hợi: "Tý",
  },
};
