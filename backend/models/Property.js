const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    category: { type: String, enum: ['Buy', 'Rent'], required: true }, // Added category for filtering
    description: { type: String },
    amenities: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
