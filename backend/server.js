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
app.use('/uploads', express.static('uploads'));

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
    // ... existing get code ...
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

app.delete('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (job) await logActivity('DELETE_JOB', 'Admin', 'Admin', `Deleted job: ${job.title}`);
        res.json({ message: 'Job deleted' });
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
