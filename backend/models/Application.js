const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    coverLetter: { type: String },
    resumeLink: { type: String }, // URL to resume
    status: { type: String, enum: ['New', 'Reviewed', 'Interview', 'Rejected', 'Hired'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
