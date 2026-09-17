import {
  newChinhTinh,
  checkSaoDaiVan,
  checkSaoLuuNien,
  checkSaoLuuNguyet,
  checkSaoLuuNhat,
  capitalizeWords,
} from "./constants";

import { LANGUAGE } from "./constants";

const getStarName = (star) => {
  return LANGUAGE === "en" ? star.saoTenEn : star.saoTen;
};

function getSao(cungChu, thapNhiCung, tamHop = false) {
  const cungArr = thapNhiCung.filter((c) => {
    return c.cungChu === cungChu;
  });
  if (cungArr.length > 0) {
    let cung = cungArr[0];
    const { cungSao, cungSo } = cung;
    const chinhTinhGoc = cungSao.filter((sao) => sao.saoAmDuong !== "");
    const chinhTinhMoi = cungSao.filter(
      (sao) =>
        newChinhTinh.includes(sao.saoID) &&
        !checkSaoDaiVan(getStarName(sao)) &&
        !checkSaoLuuNien(getStarName(sao)) &&
        !checkSaoLuuNguyet(getStarName(sao)) &&
        !checkSaoLuuNhat(getStarName(sao))
    );
    let saoDaiVan = cungSao.filter((sao) => checkSaoDaiVan(getStarName(sao)));
    let saoLuuNien = cungSao.filter((sao) => checkSaoLuuNien(getStarName(sao)));
    let saoLuuNguyet = cungSao.filter((sao) =>
      checkSaoLuuNguyet(getStarName(sao))
    );
    let saoLuuNhat = cungSao.filter((sao) => checkSaoLuuNhat(getStarName(sao)));
    let chinhTinhDaiVanId = [92, 93, 94, 95];
    let chinhTinhDaiVan = saoDaiVan.filter((sao) =>
      chinhTinhDaiVanId.includes(sao.saoID)
    );
    let phuTinhDaiVan = saoDaiVan.filter(
      (sao) => !chinhTinhDaiVanId.includes(sao.saoID)
    );
    let tuan = cung.tuanTrung;
    let triet = cung.trietLo;
    let chinhTinh = [...chinhTinhGoc, ...chinhTinhMoi];
    if (tamHop) {
      chinhTinh = [...chinhTinhMoi];
    }
    if (tuan) {
      chinhTinh = [...chinhTinh, { saoTen: "Tuần", saoTenEn: "Void Zone" }];
    }
    if (triet) {
      chinhTinh = [...chinhTinh, { saoTen: "Triệt", saoTenEn: "Void Cut" }];
    }
    if (cung.daiVanTuanTrung) {
      saoDaiVan = [
        ...saoDaiVan,
        { saoTen: "X. Tuần", saoTenEn: "X. Void Zone" },
      ];
      chinhTinhDaiVan = [
        ...chinhTinhDaiVan,
        { saoTen: "X. Tuần", saoTenEn: "X. Void Zone" },
      ];
    }
    if (cung.daiVanTrietLo) {
      saoDaiVan = [
        ...saoDaiVan,
        { saoTen: "X. Triệt", saoTenEn: "X. Void Cut" },
      ];
      chinhTinhDaiVan = [
        ...chinhTinhDaiVan,
        { saoTen: "X. Triệt", saoTenEn: "X. Void Cut" },
      ];
    }
    if (cung.luuNienTuanTrung) {
      saoLuuNien = [
        ...saoLuuNien,
        { saoTen: "Y. Tuần", saoTenEn: "Y. Void Zone" },
      ];
    }
    if (cung.luuNienTrietLo) {
      saoLuuNien = [
        ...saoLuuNien,
        { saoTen: "Y. Triệt", saoTenEn: "Y. Void Cut" },
      ];
    }
    if (cung.luuNguyetTuanTrung) {
      saoLuuNguyet = [
        ...saoLuuNguyet,
        { saoTen: "M. Tuần", saoTenEn: "M. Void Zone" },
      ];
    }
    if (cung.luuNguyetTrietLo) {
      saoLuuNguyet = [
        ...saoLuuNguyet,
        { saoTen: "M. Triệt", saoTenEn: "M. Void Cut" },
      ];
    }

    const phuTinh = cungSao.filter(
      (sao) =>
        sao.saoAmDuong === "" &&
        !newChinhTinh.includes(sao.saoID) &&
        !checkSaoDaiVan(getStarName(sao)) &&
        !checkSaoLuuNien(getStarName(sao)) &&
        !checkSaoLuuNguyet(getStarName(sao)) &&
        !checkSaoLuuNhat(getStarName(sao))
    );

    return {
      chinhTinh: chinhTinh
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      phuTinh: phuTinh
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      daiVan: saoDaiVan
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      chinhTinhDaiVan: chinhTinhDaiVan
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      phuTinhDaiVan: phuTinhDaiVan
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      luuNien: saoLuuNien
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      luuNguyet: saoLuuNguyet
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      luuNhat: saoLuuNhat
        .map((sao) => capitalizeWords(getStarName(sao)))
        .join(" + "),
      cungDaiHan: cung.cungDaiHan,
    };
  }
  return {
    chinhTinh: "",
    phuTinh: "",
  };
}

export {
  getSao,
};