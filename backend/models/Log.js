const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: { type: String, required: true }, // e.g., 'LOGIN', 'LOGOUT', 'CREATE_PROPERTY'
    performer: { type: String, required: true }, // e.g., 'admin@rumajia.com'
    role: { type: String, default: 'Admin' }, // 'Admin', 'Agent', 'System'
    details: { type: String },
    ip: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
