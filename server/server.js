const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Import routes
const weatherRoutes = require('./routes/weather');

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Use weather routes
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 