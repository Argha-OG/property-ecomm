const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Agent = require('./models/Agent');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected for Agent Seeding'))
    .catch(err => console.log(err));

const seedAgents = [
    {
        name: "Ali Baba",
        email: "ali@property.com",
        phone: "+60123456789",
        role: "Senior Negotiator",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        bio: "Top performing agent for 5 years running. Specialist in Mont Kiara properties.",
        status: "Active"
    },
    {
        name: "Siti Nurhaliza",
        email: "siti@property.com",
        phone: "+60198765432",
        role: "Property Manager",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        bio: "Expert in rental management and tenant relations.",
        status: "Active"
    },
    {
        name: "John Smith",
        email: "john@property.com",
        phone: "+601122334455",
        role: "Real Estate Agent",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        bio: "Focused on commercial properties and office spaces.",
        status: "Active"
    },
    {
        name: "Mei Ling",
        email: "mei@property.com",
        phone: "+60177788899",
        role: "Sales Executive",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        bio: "Passionate about helping first-time homebuyers.",
        status: "Inactive"
    }
];

const seedDB = async () => {
    try {
        await Agent.deleteMany({});
        console.log('Existing agents removed');

        await Agent.insertMany(seedAgents);
        console.log('Database seeded with 4 agents');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDB();
