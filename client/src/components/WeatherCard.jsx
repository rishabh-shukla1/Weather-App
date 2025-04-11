import React from 'react';

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return null;
    if (weatherData.error) {
        return <div className="error-message">{weatherData.error}</div>;
    }

    const getWeatherIcon = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    const formatTemperature = (temp) => {
        return `${Math.round(temp)}°C`;
    };

    return (
        <div className="weather-card">
            <div className="weather-header">
                <h2>{weatherData.city}, {weatherData.country}</h2>
                <div className="temperature">
                    {formatTemperature(weatherData.temperature)}
                </div>
            </div>
            <div className="weather-details">
                <div className="weather-condition">
                    <img
                        src={getWeatherIcon(weatherData.icon)}
                        alt={weatherData.condition}
                        className="weather-icon"
                    />
                    <span className="weather-description">
                        {weatherData.description}
                    </span>
                </div>
                <div className="weather-stats">
                    <div className="stat">
                        <span>Humidity</span>
                        <span>{weatherData.humidity}%</span>
                    </div>
                    <div className="stat">
                        <span>Wind Speed</span>
                        <span>{weatherData.windSpeed} m/s</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard; 