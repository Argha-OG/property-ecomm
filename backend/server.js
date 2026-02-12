const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Property = require('./models/Property');
const verifyToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.get('/api/properties', async (req, res) => {
    try {
        const { category, isNew } = req.query;
        let query = {};

        if (category) {
            query.category = category; // 'Buy' or 'Rent'
        }

        if (isNew === 'true') {
            query.isNew = true;
        }

        const properties = await Property.find(query);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected Route Example (For Testing)
app.get('/api/admin/check', verifyToken, (req, res) => {
    res.json({ message: 'Authenticated successfully', user: req.user });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
