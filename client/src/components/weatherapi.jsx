import axios from "axios";

const API_BASE_URL = "http://localhost:3002"; // Change if using a deployed backend

export const fetchWeather = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return [];
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
};

export const addCity = async (city) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cities`, { name: city });
    return response.data;
  } catch (error) {
    console.error("Error adding city:", error.response?.data || error);
    throw error;
  }
};

export const removeCity = async (city) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cities/${city}`);
    return response.data;
  } catch (error) {
    console.error("Error removing city:", error.response?.data || error);
    throw error;
  }
};
