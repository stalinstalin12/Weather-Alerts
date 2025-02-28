const AlertCard = ({ city, alertType }) => {
    return (
      <div className="bg-red-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-red-600">{alertType}</h2>
        <p className="text-gray-700">City: {city}</p>
      </div>
    );
  };
  
  export default AlertCard;
  