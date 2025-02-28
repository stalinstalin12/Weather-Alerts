const axios = require("axios");
const Weather = require("../db/Models/weather");
const Alert = require("../db/Models/alert");

const API_KEY = process.env.WEATHER_API_KEY;
const cities = ["New York", "London", "Mumbai","Palakkad"];

// Fetch Weather Data
const fetchWeatherData = async () => {
  try {
    for (const city of cities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const { data } = await axios.get(url);

      const weatherData = {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main.toLowerCase(),
      };

      await Weather.create(weatherData);
      checkAlertConditions(weatherData);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Check Alert Conditions
const checkAlertConditions = async ({ city, temperature, condition }) => {
  let alerts = [];

  if (condition.includes("rain")) alerts.push("Rain detected");
  if (temperature > 30) alerts.push(`High Temperature (${temperature}°C)`);
  if (temperature < 10) alerts.push(`Low Temperature (${temperature}°C)`);

  for (const alertType of alerts) {
    await Alert.create({ city, alertType });
    console.log(`Alert: ${alertType} in ${city}`);
  }
};

// Get Weather Data API
const getWeatherData = async (req, res) => {
  try {
    const weather = await Weather.find().sort({ timestamp: -1 });
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get Alerts API
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { fetchWeatherData, getWeatherData, getAlerts };
