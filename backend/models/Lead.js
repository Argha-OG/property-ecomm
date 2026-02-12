const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }, // Optional, as it might not be in all forms, but good to have
    message: { type: String, required: true },
    property: { type: String, default: 'General Inquiry' }, // For context if coming from a property page
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
