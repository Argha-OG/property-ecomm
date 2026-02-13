const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// ... previous code ...
const Property = require('./models/Property');
const Job = require('./models/Job');
const Agent = require('./models/Agent');
const Application = require('./models/Application');
const Log = require('./models/Log');
const verifyToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Helper for Backend Logging
const logActivity = async (action, performer, role, details) => {
    try {
        await Log.create({ action, performer, role, details });
    } catch (err) {
        console.error('Logging failed:', err);
    }
};

// Middleware
app.use(cors());
app.use(express.json());
// Serve static uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static uploads
app.use('/uploads', express.static('uploads'));

// Upload Route
app.post('/api/upload', upload.array('files', 12), (req, res) => {
    try {
        const filePaths = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        res.json({ urls: filePaths });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Property Routes ---
app.get('/api/properties', async (req, res) => {
    console.log('GET /api/properties hit');
    try {
        const { type, location, minPrice, maxPrice } = req.query;
        let query = {};

        if (type && type !== 'All') query.type = type;
        if (location && location !== 'All') query.location = location;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const properties = await Property.find(query).sort({ createdAt: -1 });
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

// --- Log Routes ---
app.get('/api/logs', async (req, res) => {
    try {
        const logs = await Log.find().sort({ createdAt: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/logs', async (req, res) => {
    try {
        const newLog = new Log(req.body);
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Job Routes ---
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'Active' }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/admin/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/admin/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/jobs', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        const savedJob = await newJob.save();
        await logActivity('CREATE_JOB', 'Admin', 'Admin', `Created job: ${savedJob.title}`);
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedJob) await logActivity('UPDATE_JOB', 'Admin', 'Admin', `Updated job: ${updatedJob.title}`);
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (job) await logActivity('DELETE_JOB', 'Admin', 'Admin', `Deleted job: ${job.title}`);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Property Routes (Rest of CRUD) ---
// Note: GET is likely defined above this block in the original file, checking if I need to add it here or if I'm appending.
// The previous view didn't show the GET /api/properties, implying it's earlier in the file. 
// I will add the missing PUT/DELETE here.

app.post('/api/properties', async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        const savedProperty = await newProperty.save();
        await logActivity('CREATE_PROPERTY', 'Admin', 'Admin', `Created property: ${savedProperty.title}`);
        res.status(201).json(savedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/properties/:id', async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedProperty) await logActivity('UPDATE_PROPERTY', 'Admin', 'Admin', `Updated property: ${updatedProperty.title}`);
        res.json(updatedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/properties/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (property) await logActivity('DELETE_PROPERTY', 'Admin', 'Admin', `Deleted property: ${property.title}`);
        res.json({ message: 'Property deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Agent Routes ---
app.get('/api/agents', async (req, res) => {
    try {
        const agents = await Agent.find().sort({ createdAt: -1 });
        res.json(agents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/agents', async (req, res) => {
    try {
        const newAgent = new Agent(req.body);
        const savedAgent = await newAgent.save();
        await logActivity('ADD_AGENT', 'Admin', 'Admin', `Added agent: ${savedAgent.name}`);
        res.status(201).json(savedAgent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/agents/:id', async (req, res) => {
    try {
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedAgent) await logActivity('UPDATE_AGENT', 'Admin', 'Admin', `Updated agent: ${updatedAgent.name}`);
        res.json(updatedAgent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/agents/:id', async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (agent) await logActivity('DELETE_AGENT', 'Admin', 'Admin', `Deleted agent: ${agent.name}`);
        res.json({ message: 'Agent deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Application Routes ---
app.post('/api/applications', async (req, res) => {
    try {
        const newApp = new Application(req.body);
        const savedApp = await newApp.save();
        res.status(201).json(savedApp);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const Lead = require('./models/Lead');
// ... (Previous imports)

// --- Lead Routes ---
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/leads', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        await logActivity('NEW_LEAD', 'System', 'User', `New inquiry from ${savedLead.name}`);
        res.status(201).json(savedLead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Check if default admin exists
    // (Optional: You could verify/create admin here if strictly needed)
});
