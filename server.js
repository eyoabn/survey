require('dotenv').config(); // Load .env file
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const submitRouter = require('./api/submit'); // Import the router properly
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('🔥 MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Simple Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Use the submit router
app.use('/api', submitRouter); // Fix this to correctly map /api/submit

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
