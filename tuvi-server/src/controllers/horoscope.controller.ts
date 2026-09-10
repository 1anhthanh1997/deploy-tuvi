import { Request, Response, NextFunction } from "express";
import horoscopeService from "../services/horoscope.service";

const getHoroscope = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const horoscope = await horoscopeService.calculateHoroscope(req);
    res.status(200).json(horoscope);
  } catch (error) {
    next(error);
  }
};

const getStartDecade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const startDecade = await horoscopeService.getStartDecadeYear(req);
    res.status(200).json(startDecade);
  } catch (error) {
    next(error);
  }
};

const getBaziResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const baziResult = await horoscopeService.getBaziResult(req);
    res.status(200).json(baziResult);
  } catch (error) {
    next(error);
  }
};

const getHoroscopeChart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chart = await horoscopeService.getHoroscopeChart(req);
    res.status(200).json(chart);
  } catch (error) {
    next(error);
  }
};

const getBaziData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const baziData = await horoscopeService.getBaziChartData(req);
    res.status(200).json(baziData);
  } catch (error) {
    next(error);
  }
};

export default {
  getHoroscope,
  getStartDecade,
  getBaziResult,
  getHoroscopeChart,
  getBaziData,
};
