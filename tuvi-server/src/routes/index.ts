import express from "express";
import userRoutes from "./user.routes";
import horoscopeRouter from "./horoscope.routes";

const router = express.Router();

router.use("", userRoutes);
router.use("", horoscopeRouter);

export default router;
