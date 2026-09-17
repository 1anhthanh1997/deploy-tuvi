import { Request } from "express";
import moment from "moment";

import { lapDiaBan } from "../utils/helper/lapDiaBan";
import LapThienBan from "../utils/helper/thienban";
import diaBan from "../utils/helper/diaBan";
import {
  getMainInfoText,
  getTimelineInfoText,
  getStartDecade,
  getBaziText,
  convertHourInfo,
} from "../utils/helper/getMainInfo";
import { getBaziData } from "../utils/helper/batTu";

import { getNextDay } from "../utils/helper/amDuong";

type LapDiaBanResult = {
  thapNhiCung: unknown;
  maCanChiDaivan: unknown;
  maCanChiTieuVan: unknown;
  maCanChiNguyetVan: unknown;
  maCanChiNhatVan: unknown;
};

const parseThangLuuNguyet = (req: Request) =>
  parseInt(
    (req.query.thangluunhat as string) ||
      (req.query.thangluunguyet as string) ||
      "0"
  ) || 0;

const calculateHoroscope = (req: Request) => {
  const now = moment();
  const hoTen = req.query.hoten || "";
  let ngaySinh = parseInt(req.query.ngaysinh as string) || now.date();
  let thangSinh = parseInt(req.query.thangsinh as string) || now.month() + 1;
  let namSinh = parseInt(req.query.namsinh as string) || now.year();
  let gioSinh = parseInt(req.query.giosinh as string) || 1;
  const duongLich = req.query.amlich === "on" ? false : true;
  const gioiTinh = req.query.gioitinh === "nam" ? 1 : -1;
  const timeZone = parseInt(req.query.muigio as string) || 7;
  const namXemTieuVan = parseInt(req.query.namxemtieuvan as string) || 0;
  const namXemDaiVan =
    parseInt(req.query.namxemdaivan as string) || namXemTieuVan;
  const thangLuuNguyet = parseThangLuuNguyet(req);
  const ngayLuuNhat = parseInt(req.query.ngayluunhat as string) || 0;

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
    namXemDaiVan,
    thangLuuNguyet,
    ngayLuuNhat,
  };

  // Gọi các hàm xử lý

  return {
    mainLaSoText: getMainInfoText(baseInfo),
    timeLineLaSoText: getTimelineInfoText(baseInfo),
  };
};

const getHoroscopeChart = (req: Request) => {
  const now = moment();
  const hoTen = req.query.hoten || "";
  let gioSinh = parseInt(req.query.giosinh as string) || 1;
  let ngaySinh = parseInt(req.query.ngaysinh as string) || now.date();
  let thangSinh = parseInt(req.query.thangsinh as string) || now.month() + 1;
  let namSinh = parseInt(req.query.namsinh as string) || now.year();
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
  const timeZone = parseInt(req.query.muigio as string) || 7;
  const luunien = req.query.luunien === "on";
  const namXemTieuVan = parseInt(req.query.namxemtieuvan as string) || now.year();
  const thangLuuNguyet =
    parseInt(
      (req.query.thangluunguyet as string) ||
        (req.query.thangluunhat as string) ||
        ""
    ) || null;
  const ngayLuuNhat = parseInt(req.query.ngayluunhat as string) || null;
  const daivan = req.query.daivan === "on";
  const namXemDaiVan = parseInt(req.query.namxemdaivan as string) || now.year();

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
  ) as LapDiaBanResult;
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

  return {
    thienBan,
    thapNhiCung: data.thapNhiCung,
    maCanChiDaiVan: data.maCanChiDaivan,
    maCanChiTieuVan: data.maCanChiTieuVan,
    maCanChiNguyetVan: data.maCanChiNguyetVan,
    maCanChiNhatVan: data.maCanChiNhatVan,
  };
};

const getStartDecadeYear = (req: Request) => {
  const now = moment();
  const hoTen = req.query.hoten || "";
  let ngaySinh = parseInt(req.query.ngaysinh as string) || now.date();
  let thangSinh = parseInt(req.query.thangsinh as string) || now.month() + 1;
  let namSinh = parseInt(req.query.namsinh as string) || now.year();
  let gioSinh = parseInt(req.query.giosinh as string) || 1;
  const duongLich = req.query.amlich === "on" ? false : true;
  const gioiTinh = req.query.gioitinh === "nam" ? 1 : -1;
  const timeZone = parseInt(req.query.muigio as string) || 7;
  const namXemTieuVan = parseInt(req.query.namxemtieuvan as string) || 0;
  const namXemDaiVan =
    parseInt(req.query.namxemdaivan as string) || namXemTieuVan;
  const thangLuuNguyet = parseInt(req.query.thangluunhat as string) || 0;
  const ngayLuuNhat = parseInt(req.query.ngayluunhat as string) || 0;

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
    namXemDaiVan,
    thangLuuNguyet,
    ngayLuuNhat,
  };

  return { startDecadeYear: getStartDecade(baseInfo) };
};

const getBaziResult = (req: Request) => {
  const now = moment();
  const hoTen = req.query.hoten || "";
  let ngaySinh = parseInt(req.query.ngaysinh as string) || now.date();
  let thangSinh = parseInt(req.query.thangsinh as string) || now.month() + 1;
  let namSinh = parseInt(req.query.namsinh as string) || now.year();
  const boTruGio = req.query.boTruGio === "on";
  let gioSinh =
    !boTruGio && req.query.giosinh
      ? parseInt(req.query.giosinh as string)
      : undefined;
  const duongLich = req.query.amlich === "on" ? false : true;
  const gioiTinh = req.query.gioitinh === "nam" ? 1 : -1;
  const timeZone = parseInt(req.query.muigio as string) || 7;
  const onlyDecade = req.query.onlyDecade === "on";
  const luunien = req.query.luunien === "on";

  let namXemTieuVan: number | undefined;
  let namXemDaiVan: number | undefined;

  if (onlyDecade) {
    namXemTieuVan = undefined;
    namXemDaiVan =
      parseInt(req.query.namxemdaivan as string) || now.year();
  } else if (luunien) {
    namXemTieuVan =
      parseInt(req.query.namxemtieuvan as string) || now.year();
    namXemDaiVan =
      parseInt(req.query.namxemdaivan as string) || namXemTieuVan;
  } else {
    namXemTieuVan = req.query.namxemtieuvan
      ? parseInt(req.query.namxemtieuvan as string)
      : undefined;
    namXemDaiVan = req.query.namxemdaivan
      ? parseInt(req.query.namxemdaivan as string)
      : undefined;
  }

  const thangLuuNguyet = req.query.thangluunguyet
    ? parseInt(req.query.thangluunguyet as string)
    : undefined;
  const ngayLuuNhat = req.query.ngayluunhat
    ? parseInt(req.query.ngayluunhat as string)
    : undefined;
  const gioThoiVan = req.query.giothoivan
    ? parseInt(req.query.giothoivan as string)
    : undefined;

  const noneHour = boTruGio || gioSinh === undefined;

  let baseInfo = {
    hoTen,
    ngaySinh,
    thangSinh,
    namSinh,
    gioSinh,
    gioiTinh,
    duongLich,
    timeZone,
    namXemDaiVan,
    namXemTieuVan,
    thangLuuNguyet,
    ngayLuuNhat,
    gioThoiVan,
  };

  return {
    baziResult: getBaziText(baseInfo, noneHour),
  };
};

const getBaziChartData = (req: Request) => {
  const now = moment();
  const hoTen = req.query.hoten || "";
  let ngaySinh = parseInt(req.query.ngaysinh as string) || now.date();
  let thangSinh = parseInt(req.query.thangsinh as string) || now.month() + 1;
  let namSinh = parseInt(req.query.namsinh as string) || now.year();
  let gioSinh = parseInt(req.query.giosinh as string) || 1;
  const duongLich = req.query.amlich === "on" ? false : true;
  const gioiTinh = req.query.gioitinh === "nam" ? 1 : -1;
  const timeZone = parseInt(req.query.muigio as string) || 7;
  const luunien = req.query.luunien === "on";
  const namXemTieuVan =
    req.query.namxemtieuvan && luunien
      ? parseInt(req.query.namxemtieuvan as string)
      : undefined;
  const thangLuuNguyet =
    req.query.thangluunguyet && luunien
      ? parseInt(req.query.thangluunguyet as string)
      : undefined;
  const ngayLuuNhat =
    req.query.ngayluunhat && luunien
      ? parseInt(req.query.ngayluunhat as string)
      : undefined;
  const gioThoiVan =
    req.query.giothoivan && luunien
      ? parseInt(req.query.giothoivan as string)
      : undefined;
  const boTruGio = req.query.boTruGio === "on";
  const onlyDecade = req.query.onlyDecade === "on";
  const namXemDaiVan = onlyDecade
    ? parseInt(req.query.namxemdaivan as string) || now.year()
    : undefined;

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
    namXemDaiVan,
    thangLuuNguyet,
    ngayLuuNhat,
    gioThoiVan,
  };
  baseInfo = convertHourInfo(baseInfo);

  const data = lapDiaBan(
    diaBan,
    baseInfo.ngaySinh,
    baseInfo.thangSinh,
    baseInfo.namSinh,
    baseInfo.gioSinh,
    gioiTinh,
    duongLich,
    timeZone,
    baseInfo.namXemTieuVan,
    baseInfo.namXemDaiVan || 0,
    baseInfo.thangLuuNguyet,
    baseInfo.ngayLuuNhat
  ) as LapDiaBanResult;

  return getBaziData(baseInfo, data.thapNhiCung, boTruGio);
};

export default {
  calculateHoroscope,
  getStartDecadeYear,
  getBaziResult,
  getHoroscopeChart,
  getBaziChartData,
};
