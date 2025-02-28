const express = require("express");
const { getWeatherData, getAlerts, addCity, removeCity } = require("../Controllers/weatherController");

const router = express.Router();

router.get("/weather", getWeatherData);
router.get("/alerts", getAlerts);
router.post("/cities", addCity);
router.delete("/cities/:city", removeCity);

module.exports = router;
