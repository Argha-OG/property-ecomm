const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Log = require('./models/Log');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected for Log Seeding'))
    .catch(err => console.log(err));

const seedLogs = [
    {
        action: "LOGIN",
        performer: "admin@demojk.com",
        role: "Admin",
        details: "Admin logged in successfully",
        ip: "127.0.0.1",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) // 1 day ago
    },
    {
        action: "CREATE_PROPERTY",
        performer: "admin@demojk.com",
        role: "Admin",
        details: "Created property: Luxury Sky Villa",
        ip: "127.0.0.1",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
    },
    {
        action: "NEW_LEAD",
        performer: "System",
        role: "User",
        details: "New inquiry from John Doe",
        ip: "192.168.1.1",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    },
    {
        action: "UPDATE_JOB",
        performer: "admin@demojk.com",
        role: "Admin",
        details: "Updated job: Senior Real Estate Agent",
        ip: "127.0.0.1",
        createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
    },
    {
        action: "LOGOUT",
        performer: "admin@demojk.com",
        role: "Admin",
        details: "User logged out",
        ip: "127.0.0.1",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
    }
];

const seedDB = async () => {
    try {
        await Log.deleteMany({});
        console.log('Existing logs removed');

        await Log.insertMany(seedLogs);
        console.log('Database seeded with 5 mock logs');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDB();
