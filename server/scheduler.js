const cron = require("node-cron");
const { fetchWeatherData } = require("./Controllers/weatherController");

cron.schedule("*/1 * * * *", () => {
  console.log("Fetching weather data...");
  fetchWeatherData();
});
