import { useState } from "react";
import { addCity, removeCity } from "./weatherapi";
import { toast } from "react-toastify";

const CityForm = ({ onCityAdded }) => {
  const [city, setCity] = useState("");

  const handleAddCity = async () => {
    if (!city) return toast.error("City name is required!");
    try {
      await addCity(city);
      toast.success(`${city} added successfully!`);
      setCity("");
      onCityAdded(); // Refresh data
    } catch (error) {
        console.log(error)
      toast.error("Failed to add city.");
    }
  };

  const handleRemoveCity = async () => {
    if (!city) return toast.error("City name is required!");
    try {
      await removeCity(city);
      toast.success(`${city} removed successfully!`);
      setCity("");
      onCityAdded(); // Refresh data
    } catch (error) {
        console.log(error)
      toast.error("Failed to remove city.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        placeholder="Enter city name"
        className="p-2 border rounded"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleAddCity} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Add City
      </button>
      <button onClick={handleRemoveCity} className="ml-2 p-2 bg-red-500 text-white rounded">
        Remove City
      </button>
    </div>
  );
};

export default CityForm;
