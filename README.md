# Weather Dashboard

A real-time weather dashboard built with MERN stack that allows users to search for weather information by city name.

## Features

- Real-time weather data
- Clean and modern UI
- Responsive design
- Error handling
- Weather details including temperature, humidity, and wind speed

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key

## Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```
4. Create a `.env` file in the server directory with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoint

- `GET /api/weather?city={cityName}` - Returns weather data for the specified city

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express
- API: OpenWeatherMap
- Styling: CSS 