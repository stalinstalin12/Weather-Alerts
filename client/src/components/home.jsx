import { useEffect, useState } from "react";
import { fetchWeather, fetchAlerts } from "./weatherapi";
import WeatherCard from "./weathercard";
import AlertCard from "./alertcard";
import CityForm from "./city";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const loadData = async () => {
    const weather = await fetchWeather();
    const alerts = await fetchAlerts();
    setWeatherData(weather);
    setAlerts(alerts);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Weather Alert Dashboard</h1>

      <CityForm onCityAdded={loadData} />

      <h2 className="text-xl font-bold mt-4">Weather Data</h2>
      <div className="grid grid-cols-2 gap-4">
        {weatherData.map((weather, index) => (
          <WeatherCard key={index} {...weather} />
        ))}
      </div>

      <h2 className="text-xl font-bold mt-4">Alerts</h2>
      <div className="grid grid-cols-2 gap-4">
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </div>
    </div>
  );
};

export default Home;
