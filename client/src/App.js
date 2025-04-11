import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="background-overlay"></div>
      <header className="App-header">
        <div className="header-content">
          <h1>Weather Dashboard</h1>
          <p className="subtitle">Get real-time weather information for any city</p>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>
      </header>
      <main>
        <SearchBar onSearch={setWeatherData} />
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </main>
    </div>
  );
}

export default App;
