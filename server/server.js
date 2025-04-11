const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// OpenWeather API configuration
const OPENWEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Cache to store recent API responses
const weatherCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

app.use(cors());
app.use(express.json());

// Middleware to check API key
const checkApiKey = (req, res, next) => {
    if (!API_KEY) {
        return res.status(500).json({ error: 'OpenWeather API key is not configured' });
    }
    next();
};

app.get('/api/weather', checkApiKey, async (req, res) => {
    try {
        const { city } = req.query;
        
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        // Check cache first
        const cachedData = weatherCache.get(city);
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            return res.json(cachedData.data);
        }

        // Make API call to OpenWeather
        const response = await axios.get(
            `${OPENWEATHER_BASE_URL}/weather`,
            {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            }
        );

        const weatherData = {
            temperature: response.data.main.temp,
            condition: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country
        };

        // Cache the response
        weatherCache.set(city, {
            data: weatherData,
            timestamp: Date.now()
        });

        res.json(weatherData);
    } catch (error) {
        console.error('Weather API Error:', error.response?.data || error.message);
        
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'City not found' });
        }
        
        if (error.response?.status === 429) {
            return res.status(429).json({ 
                error: 'API rate limit exceeded. Please try again in 10 minutes.',
                message: error.response.data.message
            });
        }
        
        if (error.response?.status === 401) {
            return res.status(401).json({ 
                error: 'Invalid API key. Please check your OpenWeather API key configuration.'
            });
        }

        res.status(500).json({ 
            error: 'Error fetching weather data',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!API_KEY) {
        console.warn('WARNING: OpenWeather API key is not configured. Please set OPENWEATHER_API_KEY in .env file');
    }
}); 