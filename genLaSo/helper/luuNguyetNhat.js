const { S2L } = require("./handleTime.js");
const {
  canChiNgay,
  thienCan,
  ngayThangNamCanChi,
  ngayThangNam,
  diaChi,
} = require("./amDuong.js");
const { lapLuuNguyet } = require("./luuNguyet.js");
const { lapLuuNhat } = require("./luuNhat.js");

const SAO_CUNG_MENH_TYPE = 0;
const SAO_CUNG_THAN_TYPE = 1;
const SAO_CUNG_DAI_VAN_TYPE = 2;
const SAO_CUNG_TIEU_VAN_TYPE = 3;

function checkNgayTrongNam(nn, tt, nnnn, timeZone = 7) {
  let thangNhuan = 0;
  let currentDate = new Date();
  let currenDateData = S2L(
    currentDate.getDate(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );
  [nn, tt, nnnn, thangNhuan] = S2L(nn, tt, nnnn);

  return {
    ngayAm: nn,
    thangAm: tt,
    isValid: currenDateData[2] === nnnn,
  };
}

function checkCondition(cung, type, nnnn, namXemTieuVan) {
  let nn, tt, canThang, canNam, chiNam;
  [nn, tt, namXemTieuVan, thangNhuan] = ngayThangNam(
    5,
    5,
    namXemTieuVan,
    true,
    7
  );

  [canThang, canNam, chiNam] = ngayThangNamCanChi(
    5,
    5,
    namXemTieuVan,
    false,
    7
  );

  if (type === SAO_CUNG_MENH_TYPE) {
    return cung.cungChu === "Mệnh";
  }
  if (type === SAO_CUNG_THAN_TYPE) {
    return cung.cungThan === true;
  }
  if (type === SAO_CUNG_DAI_VAN_TYPE) {
    let tuoi = namXemTieuVan - nnnn;
    console.log("Tuoi", tuoi, cung.cungDaiHan);
    return tuoi >= cung.cungDaiHan && tuoi < cung.cungDaiHan + 10;
  }
  if (type === SAO_CUNG_TIEU_VAN_TYPE) {
    return cung.cungSo && diaChi[chiNam].tenChi === cung.cungTieuHan;
  }
  return false;
}

function getSaoCung(listSaoTen, thapNhiCung, type, nnnn, namXemTieuVan) {
  for (let cung of thapNhiCung) {
    if (checkCondition(cung, type, nnnn, namXemTieuVan)) {
      let cungSaoFilter = cung.cungSao.filter((sao) => {
        return listSaoTen.includes(sao.saoTen);
      });
      return {
        ...cung,
        cungSao: cungSaoFilter,
        kiemNhiem: [],
        cungKhacKiemNhiem: false,
      };
    }
  }
}

const addKiemNhiem = (cung, compareCung, kiemNhiemName) => {
  if (cung?.cungSo === compareCung?.cungSo) {
    cung.kiemNhiem = [...cung.kiemNhiem, kiemNhiemName];
    compareCung.cungKhacKiemNhiem = true;
  }
};

function getViTriSao(listSaoTen, thapNhiCung) {
  let viTriSao = [];
  for (let cung of thapNhiCung) {
    let cungSao = cung.cungSao;
    for (let sao of cungSao) {
      if (listSaoTen.includes(sao.saoTen)) {
        viTriSao.push({
          saoTen: sao.saoTen,
          viTriCung: cung.cungChu,
        });
      }
    }
  }
  return viTriSao;
}

function getLuuNguyet(
  DiaBan,
  nn,
  tt,
  nnnn,
  gioSinh,
  gioiTinh,
  duongLich,
  timeZone,
  namXemTieuVan
) {
  let luuNguyetData = [];
  for (let thang = 1; thang <= 12; thang++) {
    const luuNguyet = lapLuuNguyet(
      DiaBan,
      nn,
      tt,
      nnnn,
      gioSinh,
      gioiTinh,
      true,
      7,
      namXemTieuVan,
      thang
    );
    let thapNhiCung = luuNguyet.thapNhiCung;
    let listSaoTen = [
      "M.Tả phù",
      "M.Hữu bật",
      "M.Văn khúc",
      "M.Văn xương",
      "M.Thiên hình",
      "M.Thiên diêu",
      "M.Thiên y",
    ];
    let tuHoa = ["M.Hóa quyền", "M.Hóa lộc", "M.Hóa khoa", "M.Hóa kỵ"];
    let saoCungMenh = getSaoCung(
      listSaoTen,
      thapNhiCung,
      SAO_CUNG_MENH_TYPE,
      nnnn,
      namXemTieuVan
    );
    let saoCungThan = getSaoCung(
      listSaoTen,
      thapNhiCung,
      SAO_CUNG_THAN_TYPE,
      nnnn,
      namXemTieuVan
    );
    let saoCungDaiVan = getSaoCung(
      listSaoTen,
      thapNhiCung,
      SAO_CUNG_DAI_VAN_TYPE,
      nnnn,
      namXemTieuVan
    );
    let saoCungTieuVan = getSaoCung(
      listSaoTen,
      thapNhiCung,
      SAO_CUNG_TIEU_VAN_TYPE,
      nnnn,
      namXemTieuVan
    );
    const viTriSao = getViTriSao(tuHoa, thapNhiCung);

    addKiemNhiem(saoCungTieuVan, saoCungMenh, "Mệnh");
    addKiemNhiem(saoCungTieuVan, saoCungThan, "Thân");
    addKiemNhiem(saoCungTieuVan, saoCungDaiVan, "Đại vận");
    addKiemNhiem(saoCungDaiVan, saoCungMenh, "Mệnh");
    addKiemNhiem(saoCungDaiVan, saoCungThan, "Thân");
    addKiemNhiem(saoCungMenh, saoCungThan, "Thân");

    luuNguyetData.push({
      thang,
      saoCungMenh,
      saoCungThan,
      saoCungDaiVan,
      saoCungTieuVan,
      viTriSao
    });
  }
  return luuNguyetData;
}

function getLuuNhat(
  DiaBan,
  nn,
  tt,
  nnnn,
  gioSinh,
  gioiTinh,
  duongLich,
  timeZone,
  namXemTieuVan
) {
  const start = new Date(namXemTieuVan, 0, 1); // 01/01 của năm nhập vào
  const endYear = namXemTieuVan + 1;

  // Kiểm tra năm nhuận để tính ngày cuối tháng 2
  const isLeapYear = new Date(endYear, 1, 29).getDate() === 29;
  const end = new Date(endYear, 1, isLeapYear ? 29 : 28); // 28/02 hoặc 29/02 của năm sau

  let currentDate = new Date(start);
  let luuNhatData = [];

  while (currentDate <= end) {
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentYear = currentDate.getFullYear();
    let { ngayAm, thangAm, isValid } = checkNgayTrongNam(
      parseInt(day),
      parseInt(month),
      currentYear
    );
    if (isValid) {
      [canNgay, chiNgay] = canChiNgay(
        parseInt(day),
        parseInt(month),
        currentYear
      );
      const luuNhat = lapLuuNhat(
        DiaBan,
        nn,
        tt,
        nnnn,
        gioSinh,
        gioiTinh,
        true,
        7,
        namXemTieuVan,
        thangAm,
        canNgay
      );
      let thapNhiCung = luuNhat.thapNhiCung;
      let listSaoTen = ["D.Hóa quyền", "D.Hóa lộc", "D.Hóa khoa", "D.Hóa kỵ"];
      let saoCungTieuVan = getSaoCung(
        listSaoTen,
        thapNhiCung,
        SAO_CUNG_TIEU_VAN_TYPE,
        nnnn,
        namXemTieuVan
      );
      luuNhatData.push({
        ngay: ngayAm,
        thang: thangAm,
        saoCungTieuVan,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1); // Tăng thêm 1 ngày
  }
  return luuNhatData;
}

module.exports = {
  getLuuNhat,
  getLuuNguyet,
};
