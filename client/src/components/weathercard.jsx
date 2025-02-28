const WeatherCard = ({ city, temperature, condition }) => {
    return (
      <div className="bg-blue-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{city}</h2>
        <p className="text-gray-700">{temperature}°C - {condition}</p>
      </div>
    );
  };
  
  export default WeatherCard;
  