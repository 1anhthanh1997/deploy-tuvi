const { viToEnData } = require("./constants");
const { getSao } = require("./saoInfo");
const {
  getNumberIndex,
  getMonthName,
  getNumberCanChi,
} = require("./numberMonthInfo");
const {
  getDayYangYinInfo,
  getDayYangYinInfoBasic,
} = require("./dayYangYinInfo");
const { getBasicInfo } = require("./basicInfo");
const { getCungChuInfo } = require("./cungChuInfo");
const { lapDiaBan } = require("./lapDiaBan");
const diaBan = require("./diaBan");
const LapThienBan = require("./thienban");
const { getNextDay, getGioSinhIndex } = require("./amDuong");
const { getBaziData } = require("./batTu");
const { getBatTuTemplate } = require("./batTuTemplate");

const convertHourInfo = (baseInfo) => {
  let {
    ngaySinh,
    thangSinh,
    namSinh,
    gioSinh,
    duongLich,
    gioThoiVan,
    ngayLuuNhat,
    thangLuuNguyet,
    namXemTieuVan,
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
  gioThoiVan =
    gioThoiVan || gioThoiVan === 0 ? getGioSinhIndex(gioThoiVan) : undefined;
  baseInfo.gioThoiVan = gioThoiVan;
  gioSinh = gioSinh || gioSinh === 0 ? getGioSinhIndex(gioSinh) : undefined;
  baseInfo.gioSinh = gioSinh;
  baseInfo.ngaySinh = ngaySinh;
  baseInfo.thangSinh = thangSinh;
  baseInfo.namSinh = namSinh;
  return baseInfo;
};

const getHoroscopeInfo = (baseInfo) => {
  baseInfo = convertHourInfo(baseInfo);
  const {
    ngaySinh,
    thangSinh,
    namSinh,
    gioSinh,
    gioiTinh,
    hoTen,
    duongLich,
    timeZone,
    namXemTieuVan,
    namXemDaiVan,
    thangLuuNguyet,
    ngayLuuNhat,
  } = baseInfo;
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
    namXemDaiVan,
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
    namXemTieuVan
  );

  const laso = {
    thienBan: thienBan,
    thapNhiCung: data.thapNhiCung,
  };
  return laso;
};

const getTamHopCungSaoText = ({
  tamHopList,
  cungCach,
  cungChuThan,
  ten,
  namDuong,
  namNu,
  sapXepCungTheoTuoi,
  cungDaiVan,
  daiVanIndex,
  cungTieuVan,
  namXemTieuVan,
  thangLuuNguyet,
  ngayLuuNhat,
}) => {
  const textIndex = [
    "Trine where the native has the strongest ability to actively manifest auspiciousness",
    "Trine where the native has a strong ability to actively manifest auspiciousness",
    "Trine where the native has a limited ability to actively manifest auspiciousness",
    "Trine where the native has the weakest ability to actively manifest auspiciousness",
  ];
  const tamHopCungSaoText = tamHopList
    .map((tamHop, index) => {
      return `\n${index + 1}. Trine of ${tamHop[0]} - ${tamHop[1]} - ${
        tamHop[2]
      } (${textIndex[index]}) belongs to ${
        cungCach[index]
      } formation type, for ${
        namNu == "Nam" ? "Mr." : "Ms."
      }${ten} ${namDuong} ${tamHop
        .map((cung) => {
          let cungDaiHan = getSao(cung, sapXepCungTheoTuoi).cungDaiHan;
          return `\n${cung} Point ${
            cung === cungChuThan
              ? "concurrently holding the Identity Point "
              : ""
          }${`(concurrently holding the ${getNumberIndex(
            Math.ceil(cungDaiHan / 10)
          )} Decade timeline Point, age ${cungDaiHan - 1} to ${
            cungDaiHan + 8
          })`}${
            cungTieuVan &&
            cung.toLowerCase() === cungTieuVan.cungChu.toLowerCase()
              ? `concurrently holding Annual ${namXemTieuVan} timeline Point`
              : ""
          } of ${
            namNu == "Nam" ? "Mr." : "Ms."
          } ${ten} ${namDuong} governs information about: ${
            getCungChuInfo(cung).description
          }
      Major Energies: ${getSao(cung, sapXepCungTheoTuoi).chinhTinh}
      Auxiliary Energies: ${getSao(cung, sapXepCungTheoTuoi).phuTinh}
      The Point in external opposition to the ${cung} is the ${
            getCungChuInfo(cung).doiXung
          }${
            cungDaiVan &&
            cungDaiVan.cungChu.toLowerCase() === cung.toLowerCase()
              ? `\n        Point ${cung} concurrently holding ${getNumberIndex(
                  daiVanIndex
                )} Decade timeline Point of ${
                  namNu == "Nam" ? "Mr." : "Ms."
                }${ten} ${namDuong} age ${cungDaiVan.cungDaiHan - 1} to ${
                  cungDaiVan.cungDaiHan + 8
                }`
              : ""
          }${
            cungDaiVan
              ? `\n        Flowing with the ${getNumberIndex(
                  daiVanIndex
                )} Decade timeline (age ${cungDaiVan.cungDaiHan - 1} to ${
                  cungDaiVan.cungDaiHan + 8
                })${
                  cung === viToEnData["Mệnh"]
                    ? ", adding to the original Destiny Point"
                    : ""
                }: ${getSao(cung, sapXepCungTheoTuoi).daiVan}`
              : ""
          }${
            cungTieuVan
              ? `\n        Flowing with the ${namXemTieuVan} Annual timeline${
                  cung === viToEnData["Mệnh"]
                    ? ", adding to the original Destiny Point"
                    : ""
                }: ${getSao(cung, sapXepCungTheoTuoi).luuNien}`
              : ""
          }${
            thangLuuNguyet
              ? `\n        Flowing with the ${
                  getMonthName(thangLuuNguyet) + " " + namXemTieuVan
                } Monthly timeline : ${
                  getSao(cung, sapXepCungTheoTuoi).luuNguyet
                }`
              : ""
          }${
            ngayLuuNhat && getSao(cung, sapXepCungTheoTuoi).luuNhat
              ? `\n        Flowing with the ${
                  getMonthName(thangLuuNguyet) +
                  " " +
                  ngayLuuNhat +
                  ", " +
                  namXemTieuVan
                } Daily timeline: ${getSao(cung, sapXepCungTheoTuoi).luuNhat}`
              : ""
          }`;
        })
        .join("")}
    `;
    })
    .join("");
  return tamHopCungSaoText;
};

const getStartDecade = (baseInfo) => {
  let { thienBan, thapNhiCung } = getHoroscopeInfo(baseInfo);
  let daiVan = thapNhiCung[1].cungDaiHan % 10;
  return daiVan - 1;
};

function getMainInfoText(baseInfo) {
  let { thienBan, thapNhiCung } = getHoroscopeInfo(baseInfo);
  const { namDuong, canNamTen, ten, chiNamTen, namNu, canNgayTen } = thienBan;
  thapNhiCung.shift();
  const sapXepCungTheoCungSo = [...thapNhiCung].sort(
    (a, b) => a.cungSo - b.cungSo
  );
  const sapXepCungTheoTuoi = [...thapNhiCung].sort(
    (a, b) => a.cungDaiHan - b.cungDaiHan
  );
  const { cungCach, cungCachThan, cungChuThan, tamHopCungAnThan } =
    getBasicInfo(sapXepCungTheoTuoi);
  let tamHopList = [
    [viToEnData["Mệnh"], viToEnData["Tài Bạch"], viToEnData["Quan lộc"]],
    [viToEnData["Phúc đức"], viToEnData["Phu thê"], viToEnData["Thiên Di"]],
    [viToEnData["Huynh đệ"], viToEnData["Tật Ách"], viToEnData["Điền trạch"]],
    [viToEnData["Phụ mẫu"], viToEnData["Tử tức"], viToEnData["Nô bộc"]],
  ];

  const baseInfoText = getBaseInfoText(thapNhiCung, thienBan);
  const tamHopCungSaoText = getTamHopCungSaoText({
    tamHopList,
    cungCach,
    cungChuThan,
    ten,
    namDuong,
    namNu,
    sapXepCungTheoTuoi,
  });
  const firstSection = `Destiny Analysis Chart for ${ten}, ${
    namNu == "Nam" ? "male" : "female"
  } born in ${namDuong}\n${getDayYangYinInfoBasic(canNgayTen, ten)}`;

  const secondSection = `${tamHopCungSaoText}`;
  const contentCopy = `${firstSection}\n${baseInfoText}\n${secondSection}`;
  return contentCopy;
}

function getBaseInfoText(
  thapNhiCung,
  thienBan,
  tangVan = false,
  daiVanIndex = 1
) {
  let tamHopList = [
    [viToEnData["Mệnh"], viToEnData["Tài Bạch"], viToEnData["Quan lộc"]],
    [viToEnData["Phúc đức"], viToEnData["Phu thê"], viToEnData["Thiên Di"]],
    [viToEnData["Huynh đệ"], viToEnData["Tật Ách"], viToEnData["Điền trạch"]],
    [viToEnData["Phụ mẫu"], viToEnData["Tử tức"], viToEnData["Nô bộc"]],
  ];
  const { namDuong, canNamTen, ten, chiNamTen, namNu } = thienBan;
  const { cungCach, cungCachThan, cungChuThan, tamHopCungAnThan } =
    getBasicInfo(thapNhiCung);
  const tamHopThanIndex = tamHopList.findIndex((tamHop) =>
    tamHop.includes(cungChuThan)
  );

  let chinhTinhDaiVanMenh = [
    getSao(viToEnData["Mệnh"], thapNhiCung, true).chinhTinhDaiVan,
    getSao(viToEnData["Tài Bạch"], thapNhiCung, true).chinhTinhDaiVan,
    getSao(viToEnData["Quan lộc"], thapNhiCung, true).chinhTinhDaiVan,
  ]
    .filter((value) => value)
    .join(" + ");

  let phuTinhDaiVanMenh = [
    getSao(viToEnData["Mệnh"], thapNhiCung, true).phuTinhDaiVan,
    getSao(viToEnData["Tài Bạch"], thapNhiCung, true).phuTinhDaiVan,
    getSao(viToEnData["Quan lộc"], thapNhiCung, true).phuTinhDaiVan,
  ]
    .filter((value) => value)
    .join(" + ");

  let chinhTinhTamHopCungMenh = [
    getSao(viToEnData["Mệnh"], thapNhiCung, true).chinhTinh,
    getSao(viToEnData["Tài Bạch"], thapNhiCung, true).chinhTinh,
    getSao(viToEnData["Quan lộc"], thapNhiCung, true).chinhTinh,
  ]
    .filter((value) => value)
    .join(" + ");

  let phuTinhTamHopCungMenh = [
    getSao(viToEnData["Mệnh"], thapNhiCung, true).phuTinh,
    getSao(viToEnData["Tài Bạch"], thapNhiCung, true).phuTinh,
    getSao(viToEnData["Quan lộc"], thapNhiCung, true).phuTinh,
  ]
    .filter((value) => value)
    .join(" + ");
  let firstSection = `Foundational Information for ${ten} ${
    tangVan ? "'s" : ""
  } (born ${namDuong}) ${
    tangVan ? `for the ${getNumberIndex(daiVanIndex)} Decade Timeline` : ""
  } = Meaning of the energy combinations within (Trine of Destiny Point + Trine of Identity Point) + X.Energies within foundation information's points. The Identity Point is concurrently held by ${cungChuThan} Point`;
  let secondSection = "";
  if (!tamHopThanIndex) {
    secondSection = `Major Energies: ${cungCach[0]}${
      chinhTinhTamHopCungMenh ? ` + ${chinhTinhTamHopCungMenh}` : ""
    }${
      tangVan && chinhTinhDaiVanMenh ? ` + ${chinhTinhDaiVanMenh}` : ""
    }\nAuxiliary Energies: ${phuTinhTamHopCungMenh}${
      tangVan && phuTinhDaiVanMenh ? ` + ${phuTinhDaiVanMenh}` : ""
    }`;
  } else {
    let chinhTinhDaiVanThan = [
      getSao(tamHopCungAnThan[0], thapNhiCung, true).chinhTinhDaiVan,
      getSao(tamHopCungAnThan[1], thapNhiCung, true).chinhTinhDaiVan,
      getSao(tamHopCungAnThan[2], thapNhiCung, true).chinhTinhDaiVan,
    ]
      .filter((value) => value)
      .join(" + ");
    let phuTinhDaiVanThan = [
      getSao(tamHopCungAnThan[0], thapNhiCung, true).phuTinhDaiVan,
      getSao(tamHopCungAnThan[1], thapNhiCung, true).phuTinhDaiVan,
      getSao(tamHopCungAnThan[2], thapNhiCung, true).phuTinhDaiVan,
    ]
      .filter((value) => value)
      .join(" + ");

    let chinhTinhTamHopCungThan = [
      getSao(tamHopCungAnThan[0], thapNhiCung, true).chinhTinh,
      getSao(tamHopCungAnThan[1], thapNhiCung, true).chinhTinh,
      getSao(tamHopCungAnThan[2], thapNhiCung, true).chinhTinh,
    ]
      .filter((value) => value)
      .join(" + ");
    let phuTinhTamHopCungThan = [
      getSao(tamHopCungAnThan[0], thapNhiCung).phuTinh,
      getSao(tamHopCungAnThan[1], thapNhiCung).phuTinh,
      getSao(tamHopCungAnThan[2], thapNhiCung).phuTinh,
    ]
      .filter((value) => value)
      .join(" + ");
    getSao(tamHopCungAnThan[2], thapNhiCung).phuTinh;
    secondSection = `Trine of Destiny Point:\nMajor Energies: ${cungCach[0]}${
      chinhTinhTamHopCungMenh ? `+ ${chinhTinhTamHopCungMenh}` : ""
    }${
      tangVan && chinhTinhDaiVanMenh ? ` + ${chinhTinhDaiVanMenh}` : ""
    }\nAuxiliary Energies: ${phuTinhTamHopCungMenh}${
      tangVan && phuTinhDaiVanMenh ? ` + ${phuTinhDaiVanMenh}` : ""
    }\nTrine of Identity Point:\nChính tinh: Dạng ${cungCachThan}${
      chinhTinhTamHopCungThan ? ` + ${chinhTinhTamHopCungThan}` : ""
    }${
      tangVan && chinhTinhDaiVanThan ? ` + ${chinhTinhDaiVanThan}` : ""
    }\nPhụ tinh: ${phuTinhTamHopCungThan}${
      tangVan && phuTinhDaiVanThan ? ` + ${phuTinhDaiVanThan}` : ""
    }
    `;
  }
  return firstSection + "\n" + secondSection;
}

function getTimelineInfoText(baseInfo) {
  let { ngayLuuNhat, thangLuuNguyet, namXemTieuVan, namXemDaiVan } = baseInfo;
  if (!namXemDaiVan && !namXemTieuVan) {
    return undefined;
  }
  const { thienBan, thapNhiCung } = getHoroscopeInfo(baseInfo);
  const { namDuong, ten, namNu, canNgayTen } = thienBan;
  thapNhiCung.shift();
  const sapXepCungTheoTuoi = [...thapNhiCung].sort(
    (a, b) => a.cungDaiHan - b.cungDaiHan
  );
  const { cungCach, cungChuThan } = getBasicInfo(sapXepCungTheoTuoi);

  let tamHopList = [
    [viToEnData["Mệnh"], viToEnData["Tài Bạch"], viToEnData["Quan lộc"]],
    [viToEnData["Phúc đức"], viToEnData["Phu thê"], viToEnData["Thiên Di"]],
    [viToEnData["Huynh đệ"], viToEnData["Tật Ách"], viToEnData["Điền trạch"]],
    [viToEnData["Phụ mẫu"], viToEnData["Tử tức"], viToEnData["Nô bộc"]],
  ];
  let tuoiDaiVan = namXemDaiVan - namDuong;
  let cungTieuVan = null;
  let cungDaiVan = null;
  thapNhiCung.forEach((cung) => {
    if (cung.namTieuVanTen) {
      cungTieuVan = cung;
    }
  });

  thapNhiCung.forEach((cung) => {
    if (
      (tuoiDaiVan < 10 && cung.cungDaiHan < 10) ||
      (cung.cungDaiHan - 1 <= tuoiDaiVan && cung.cungDaiHan + 9 > tuoiDaiVan)
    ) {
      cungDaiVan = cung;
    }
  });
  const baseInfoText = getBaseInfoText(
    thapNhiCung,
    thienBan,
    true,
    Math.ceil(cungDaiVan.cungDaiHan / 10)
  );
  const tamHopCungSaoText = getTamHopCungSaoText({
    tamHopList,
    cungCach,
    cungChuThan,
    ten,
    namDuong,
    namNu,
    sapXepCungTheoTuoi,
    cungTieuVan: cungTieuVan,
    cungDaiVan: cungDaiVan,
    daiVanIndex: Math.ceil(cungDaiVan.cungDaiHan / 10),
    namXemTieuVan: namXemTieuVan,
    ngayLuuNhat: ngayLuuNhat,
    thangLuuNguyet: thangLuuNguyet,
  });
  const tamHopDaiVanIndex = tamHopList.findIndex((tamHop) =>
    tamHop.includes(cungDaiVan.cungChu)
  );
  let tamHopTieuVanIndex = "";
  if (namXemTieuVan) {
    tamHopTieuVanIndex = tamHopList.findIndex((tamHop) =>
      tamHop.includes(cungTieuVan.cungChu)
    );
  }

  const firstSection = `I. Destiny Analysis Chart for ${ten}, ${
    namNu === "Nam" ? "male" : "female"
  }, born in ${namDuong}
  1. ${getDayYangYinInfo(canNgayTen, ten)}    
  2. Timeline Points:\nDecade Timeline Point: ${
    cungDaiVan.cungChu
  } Point, belongs to the basic ${
    cungCach[tamHopDaiVanIndex]
  } formation type\n${
    namXemTieuVan
      ? `Annual Timeline Point = ${cungTieuVan.cungChu} Point, belongs to the basic  ${cungCach[tamHopTieuVanIndex]} formation type`
      : ""
  }${"\n    3. " + baseInfoText}
  `;
  const secondSection = `II. Map of ${getNumberCanChi(
    ngayLuuNhat,
    thangLuuNguyet,
    namXemTieuVan,
    namXemDaiVan
  )} Layers of Transient Energies Based on the ${getNumberCanChi(
    ngayLuuNhat,
    thangLuuNguyet,
    namXemTieuVan,
    namXemDaiVan
  )} Stem-Branch Codes as Requested${tamHopCungSaoText}`;
  return firstSection + "\n" + secondSection;
}

const getBaziText = (baseInfo, boTruGio) => {
  let thapNhiCung = boTruGio
    ? undefined
    : getHoroscopeInfo(baseInfo).thapNhiCung;
  let baziData = getBaziData(baseInfo, thapNhiCung, boTruGio);
  return getBatTuTemplate(baziData);
};

module.exports = {
  getMainInfoText,
  getTimelineInfoText,
  getStartDecade,
  getBaziText,
};
