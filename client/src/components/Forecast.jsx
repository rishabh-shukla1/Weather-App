import React from 'react';

const Forecast = ({ forecastData }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {forecastData.list.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-day">{formatDate(day.dt)}</div>
            <img
              src={getWeatherIcon(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <div className="forecast-temp">
              {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
            </div>
            <div className="forecast-description">
              {day.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast; 