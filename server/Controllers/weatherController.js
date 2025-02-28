const axios = require("axios");
const Weather = require("../db/Models/weather");
const Alert = require("../db/Models/alert");
const City = require("../db/Models/city");

const API_KEY = process.env.WEATHER_API_KEY;

// Fetch Weather Data for all cities in the database
const fetchWeatherData = async () => {
  try {
    const cities = await City.find();
    console.log("🔥 Cities Retrieved:", cities);

    if (cities.length === 0) {
      console.log("⚠️ No cities found.");
      return;
    }

    for (const city of cities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`;

      try {
        const { data } = await axios.get(url, {
          headers: { 'Cache-Control': 'no-cache' }, // 🔥 Prevents cached API response
        });

        const weatherData = {
          city: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].main.toLowerCase(),
          timestamp: new Date(), // 🔥 Store latest timestamp
        };

        // 🔥 Ensure fresh weather data is stored
        const updatedWeather = await Weather.findOneAndUpdate(
          { city: data.name },
          weatherData,
          { upsert: true, new: true }
        );

        console.log(`✅ Weather updated for ${city.name}:`, updatedWeather);

        // 🔥 Check and store alerts
        await checkAlertConditions(weatherData);

      } catch (apiError) {
        console.error(`❌ Error fetching weather for ${city.name}:`, apiError.response?.data || apiError.message);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching weather data:", error);
  }
};

// Check and store alert conditions
const checkAlertConditions = async ({ city, temperature, condition }) => {
  let alerts = [];

  if (condition.includes("rain")) alerts.push("Rain detected");
  if (temperature > 30) alerts.push(`High Temperature (${temperature}°C)`);
  if (temperature < 10) alerts.push(`Low Temperature (${temperature}°C)`);

  console.log(`Generated alerts for ${city}:`, alerts);

  for (const alertType of alerts) {
    const alert = await Alert.findOneAndUpdate(
      { city, alertType },
      { city, alertType, timestamp: new Date() },
      { upsert: true, new: true }
    );
    console.log(`✅ Alert saved: ${alertType} in ${city}`);
  }
};

// Get Weather Data API
const getWeatherData = async (req, res) => {
  try {
    const weather = await Weather.find().sort({ timestamp: -1 });
    res.json(weather);
  } catch (error) {
    console.error("❌ Error fetching weather data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get Alerts API
const getAlerts = async (req, res) => {
  try {
    const cities = await City.find();
    const cityNames = cities.map((city) => city.name);

    // Fetch alerts only for cities stored in MongoDB
    const alerts = await Alert.find({ city: { $in: cityNames } }).sort({ timestamp: -1 });

    console.log("🔔 Alerts fetched from DB:", alerts);
    res.json(alerts);
  } catch (error) {
    console.error("❌ Error fetching alerts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new city to the database
const addCity = async (req, res) => {
  try {
    console.log("📍 Request Body:", req.body);
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "City name is required" });

    const existingCity = await City.findOne({ name });
    if (existingCity) {
      return res.status(400).json({ error: "City already exists" });
    }

    const newCity = new City({ name });
    await newCity.save();

    console.log("✅ City added successfully:", newCity);

    // Fetch latest weather after adding a new city
    await fetchWeatherData();

    res.status(201).json({ message: "City added successfully", city: newCity });
  } catch (error) {
    console.error("❌ Error adding city:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a city from the database
const removeCity = async (req, res) => {
  try {
    const { city } = req.params;
    const deletedCity = await City.findOneAndDelete({ name: city });

    if (!deletedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json({ message: `🗑️ City ${city} removed successfully` });
  } catch (error) {
    console.error("❌ Error removing city:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  fetchWeatherData,
  getWeatherData,
  getAlerts,
  addCity,
  removeCity,
};
