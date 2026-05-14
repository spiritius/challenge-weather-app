import express from "express";
import {
  getForecast,
  getLocationList,
  getCityName,
} from "../controllers/index";

const router = express.Router();

router.get("/forecast", getForecast);
router.get("/search", getLocationList);
router.get("/getCityName", getCityName);

router.use("*path", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

export default router;
