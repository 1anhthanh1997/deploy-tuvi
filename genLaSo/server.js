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
const { getBaziData } = require("./helper/batTu");

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

app.get("/api/get-bazi", (req, res) => {
  try {
    const now = moment();
    const hoTen = req.query.hoten || "";
    let ngaySinh = parseInt(req.query.ngaysinh) || now.date();
    let thangSinh = parseInt(req.query.thangsinh) || now.month() + 1;
    let namSinh = parseInt(req.query.namsinh) || now.year();
    let gioSinh = parseInt(req.query.giosinh) || 1;
    const duongLich = req.query.amlich === "on" ? false : true;
    const gioiTinh = req.query.gioitinh === "nam" ? 1 : -1;
    const timeZone = parseInt(req.query.muigio) || 7;
    const namXemTieuVan = req.query.namxemtieuvan
      ? parseInt(req.query.namxemtieuvan)
      : undefined;
    const thangLuuNguyet = req.query.thangluunguyet
      ? parseInt(req.query.thangluunguyet)
      : undefined;
    const ngayLuuNhat = req.query.ngayluunhat
      ? parseInt(req.query.ngayluunhat)
      : undefined;
    const gioThoiVan = req.query.giothoivan
      ? parseInt(req.query.giothoivan)
      : undefined;
    const boTruGio = req.query.boTruGio === "on" ? true : false;

    const data = lapDiaBan(
      diaBan,
      ngaySinh,
      thangSinh,
      namSinh,
      gioSinh,
      gioiTinh,
      duongLich,
      timeZone,
      namXemTieuVan,
      0,
      thangLuuNguyet,
      ngayLuuNhat
    );
    let baseInfo = {
      hoTen,
      ngaySinh,
      thangSinh,
      namSinh,
      gioSinh,
      gioiTinh,
      duongLich,
      timeZone,
      namXemTieuVan,
      thangLuuNguyet,
      ngayLuuNhat,
      gioThoiVan,
    };
    let baziResult = getBaziData(baseInfo, data.thapNhiCung, boTruGio);
    res.json(baziResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Serve the main HTML file
app.get("/horoscope", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
