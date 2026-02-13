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

// Security Middleware
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

app.use(helmet({
    crossOriginResourcePolicy: false, // Allow loading images from other domains/local
}));
// app.use(xss()); // Error: Cannot set property query of [object Object] which has only a getter

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/api', limiter);

// Middleware
const allowedOrigins = ['http://localhost:5173', 'https://demo-jk.vercel.app', 'https://property-ecomm.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Export app for Vercel
module.exports = app;
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
const watermarkMiddleware = require('./middleware/watermark');
app.post('/api/upload', upload.array('files', 12), watermarkMiddleware, (req, res) => {
    try {
        const filePaths = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        res.json({ urls: filePaths });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PDF Route ---
const pdfController = require('./controllers/pdfController');
app.get('/api/properties/:id/brochure', pdfController.generateBrochure);

// --- Property Routes ---
app.get('/api/properties', async (req, res) => {
    console.log('GET /api/properties hit');
    try {
        const { type, location, minPrice, maxPrice, search, bedrooms, minSize, maxSize, category, limit } = req.query;
        let query = {};

        // Category Filter (Buy / Rent / New Launch)
        if (category && category !== 'All') {
            query.category = category;
        }

        // Keyword Search (Title, Location, Developer, or Type)
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: searchRegex },
                { location: searchRegex },
                { developer: searchRegex },
                { type: searchRegex }
            ];
        }

        // Specific Filters
        if (type && type !== 'All') query.type = type;

        // If 'location' is passed as a specific filter separately from 'search'
        if (location && location !== 'All') query.location = location;

        // Price Range
        if (minPrice || maxPrice) {
            // As noted, price is string, so regex or casting needed ideally, 
            // but keeping simple for now as per previous logic.
            // If improved numeric price storage happens later, update this.
        }

        // Bedroom Filter (Min Bedrooms)
        if (bedrooms && bedrooms !== 'Any') {
            const minBeds = parseInt(bedrooms);
            if (!isNaN(minBeds)) {
                query.bedrooms = { $gte: minBeds };
            }
        }

        // Size Filter (Min/Max based on areaSize - Built-up)
        if (minSize || maxSize) {
            query.areaSize = {};
            if (minSize) query.areaSize.$gte = Number(minSize);
            if (maxSize) query.areaSize.$lte = Number(maxSize);
        }

        // Land Area Filter (SRS Requirement)
        const { minLandArea, maxLandArea } = req.query;
        if (minLandArea || maxLandArea) {
            query.landArea = {};
            if (minLandArea) query.landArea.$gte = Number(minLandArea);
            if (maxLandArea) query.landArea.$lte = Number(maxLandArea);
        }

        // New Launch Filter
        if (req.query.isNewLaunch === 'true') {
            query.isNewLaunch = true;
        }

        let queryBuilder = Property.find(query).sort({ createdAt: -1 });

        // Limit results if specified
        if (limit) {
            const limitVal = parseInt(limit);
            if (!isNaN(limitVal) && limitVal > 0) {
                queryBuilder = queryBuilder.limit(limitVal);
            }
        }

        const properties = await queryBuilder;
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

// --- AI Search Route ---
const aiController = require('./controllers/aiController');
app.post('/api/ai/search', aiController.parseQuery);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
