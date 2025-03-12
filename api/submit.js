const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

const SurveySchema = new mongoose.Schema({
    fullName: String,
    age: Number
});

const Survey = mongoose.model('Survey', SurveySchema);

router.post('/submit', async (req, res) => {
    const { fullName, age } = req.body;

    if (!fullName || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newEntry = new Survey({ fullName, age });
        await newEntry.save();
        res.json({ message: 'Data saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data' });
    }
});

module.exports = router; // Export the router correctly
