const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: String, required: true },
    images: [{ type: String }], // Up to 12 images
    videos: [{ type: String }], // Up to 3 videos
    isNew: { type: Boolean, default: false },
    category: { type: String, enum: ['Buy', 'Rent', 'New Launch'], required: true }, // Added category for filtering
    description: { type: String },
    amenities: [{ type: String }],
    // New Fields for Enhanced Property Details
    furnishing: { type: String, enum: ['Fully Furnished', 'Partially Furnished', 'Unfurnished'], default: 'Unfurnished' },
    tenure: { type: String, enum: ['Freehold', 'Leasehold'], default: 'Freehold' },
    completionYear: { type: String },
    developer: { type: String },
    totalUnits: { type: String },
    facilities: [{ type: String }],

    // Agent Details embedded (or could be ref but keeping simple for now)
    agentName: { type: String },
    agentContact: { type: String },
    agentImage: { type: String },
    agentRen: { type: String }, // License number

    // Map
    mapLocation: {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String } // Full address for display
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
