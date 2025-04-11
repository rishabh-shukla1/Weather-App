import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
    const GEO_API_KEY = 'YOUR_GEO_API_KEY'; // Replace with your GeoDB API key

    const fetchSuggestions = async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`${GEO_API_URL}/cities`, {
                params: {
                    namePrefix: query,
                    limit: 5,
                    offset: 0,
                    sort: '-population'
                },
                headers: {
                    'X-RapidAPI-Key': GEO_API_KEY,
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            });
            setSuggestions(response.data.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions(city);
        }, 300);

        return () => clearTimeout(timer);
    }, [city]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!city.trim()) {
            setError('Please enter a city name');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setShowSuggestions(false);
        
        try {
            const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
            onSearch(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error fetching weather data';
            setError(errorMessage);
            onSearch({ error: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setCity(`${suggestion.city}, ${suggestion.countryCode}`);
        setShowSuggestions(false);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-bar">
                <div className="search-input-container">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setError(null);
                            setShowSuggestions(true);
                        }}
                        placeholder="Enter city name"
                        className="search-input"
                        disabled={isLoading}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="suggestion-item"
                                >
                                    {suggestion.city}, {suggestion.countryCode}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button 
                    type="submit" 
                    className="search-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <div className="search-error">{error}</div>}
        </div>
    );
};

export default SearchBar; 