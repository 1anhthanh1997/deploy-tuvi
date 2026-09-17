import express from "express";
import horoscopeController from "../controllers/horoscope.controller";
import APIConfig from "../utils/constants/apiConfig";

const horoscopeRouter = express.Router();

horoscopeRouter.get(
  APIConfig.GET_HOROSCOPE_RESULT,
  horoscopeController.getHoroscope
);

horoscopeRouter.get(
  APIConfig.GET_START_DECADE,
  horoscopeController.getStartDecade
);

horoscopeRouter.get(
  APIConfig.GET_BAZI_RESULT,
  horoscopeController.getBaziResult
);

horoscopeRouter.get(
  APIConfig.GET_HOROSCOPE_CHART,
  horoscopeController.getHoroscopeChart
);

horoscopeRouter.get(
  APIConfig.GET_BAZI_DATA,
  horoscopeController.getBaziData
);

export default horoscopeRouter;
