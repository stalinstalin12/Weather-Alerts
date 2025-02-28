const cron = require("node-cron");
const { fetchWeatherData } = require("./Controllers/weatherController");

cron.schedule("*/10 * * * *", () => {
  console.log("Fetching weather data...");
  fetchWeatherData();
});
