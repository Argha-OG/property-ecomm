const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://arghacypher_db_user:Dh2P0NFtC6LuDyWG@cluster0.kxa3aun.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected for Lead Seeding'))
    .catch(err => console.log(err));

const seedLeads = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+60123456789",
        message: "I am interested in the Luxury Sky Villa. Is it still available?",
        property: "Luxury Sky Villa",
        status: "New"
    },
    {
        name: "Sarah Lee",
        email: "sarah.lee@example.com",
        phone: "+60198765432",
        message: "Can I schedule a viewing for the Modern Bungalow this weekend?",
        property: "Modern Bungalow",
        status: "New"
    },
    {
        name: "Michael Chen",
        email: "michael.chen@gmail.com",
        phone: "+601122334455",
        message: "What is the minimum rental period for the Cozy Studio Loft?",
        property: "Cozy Studio Loft",
        status: "Contacted"
    },
    {
        name: "Ahmad Razak",
        email: "ahmad.razak@yahoo.com",
        phone: "+60177788899",
        message: "I am looking for a property in Setia Alam. Do you have other listings?",
        property: "Eco-Friendly Terrace",
        status: "New"
    },
    {
        name: "Jessica Tan",
        email: "jessica.tan@hotmail.com",
        phone: "+60166655544",
        message: "Hi, I would like to know the downpayment details for the Urban Serviced Suite.",
        property: "Urban Serviced Suite",
        status: "Closed"
    }
];

const seedDB = async () => {
    try {
        await Lead.deleteMany({});
        console.log('Existing leads removed');

        await Lead.insertMany(seedLeads);
        console.log('Database seeded with 5 mock leads');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDB();
