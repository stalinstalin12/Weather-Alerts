const express = require("express");
const { getWeatherData, getAlerts } = require("../Controllers/weatherController");

const router = express.Router();

router.get("/weather", getWeatherData);
router.get("/alerts", getAlerts);

module.exports = router;
