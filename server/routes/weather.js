const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /weather endpoint
router.get('/', async (req, res) => {
    const city = req.query.city;
    
    if (!city) {
        return res.json({ error: 'Please provide a city name' });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d8aad5cf8c96895104add23fce033a0&units=metric`;
        const response = await axios.get(url);
        
        res.json({
            temperature: response.data.main.temp,
            condition: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country
        });
    } catch (error) {
        res.json({ error: 'City not found or API error' });
    }
});

module.exports = router; 