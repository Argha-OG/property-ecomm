const mongoose = require('mongoose');
const Property = require('./models/Property');
const dotenv = require('dotenv');

dotenv.config();

// User provided connection string
const MONGO_URI = "mongodb+srv://arghacypher_db_user:Dh2P0NFtC6LuDyWG@cluster0.kxa3aun.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.log(err));

const seedProperties = [
    {
        title: "Luxury Sky Villa",
        type: "Apartment",
        location: "Mont Kiara, Kuala Lumpur",
        price: "RM 2,500,000",
        bedrooms: 4,
        bathrooms: 3,
        area: "2,200 sqft",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
        isNew: true,
        category: "Buy",
    },
    {
        title: "Modern Bungalow",
        type: "Bungalow",
        location: "Damansara Heights",
        price: "RM 5,800,000",
        bedrooms: 6,
        bathrooms: 6,
        area: "5,000 sqft",
        images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
        isNew: false,
        category: "Buy",
    },
    {
        title: "Cozy Studio Loft",
        type: "Studio",
        location: "Bangsar South",
        price: "RM 650,000",
        bedrooms: 1,
        bathrooms: 1,
        area: "600 sqft",
        images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
        isNew: false,
        category: "Buy",
    },
    {
        title: "Eco-Friendly Terrace",
        type: "Terrace",
        location: "Setia Alam",
        price: "RM 950,000",
        bedrooms: 4,
        bathrooms: 3,
        area: "1,800 sqft",
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
        isNew: true,
        category: "Buy",
    },
    {
        title: "Urban Serviced Suite",
        type: "Apartment",
        location: "KLCC, Kuala Lumpur",
        price: "RM 1,200,000",
        bedrooms: 2,
        bathrooms: 2,
        area: "900 sqft",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        isNew: false,
        category: "Buy",
    },
    {
        title: "Hilltop Retreat",
        type: "Semi-D",
        location: "Ampang",
        price: "RM 3,100,000",
        bedrooms: 5,
        bathrooms: 5,
        area: "3,500 sqft",
        images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
        isNew: false,
        category: "Buy",
    },
    // Adding 6 more to reach 12
    {
        title: "Executive Rental Condo",
        type: "Condo",
        location: "Desa ParkCity",
        price: "RM 4,500 / month",
        bedrooms: 3,
        bathrooms: 2,
        area: "1,500 sqft",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"],
        isNew: false,
        category: "Rent",
    },
    {
        title: "Seaside Villa",
        type: "Villa",
        location: "Penang",
        price: "RM 8,500,000",
        bedrooms: 5,
        bathrooms: 6,
        area: "6,000 sqft",
        images: ["https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"],
        isNew: false,
        category: "Buy",
    },
    {
        title: "City Center Penthouse",
        type: "Penthouse",
        location: "Bukit Bintang",
        price: "RM 12,000 / month",
        bedrooms: 4,
        bathrooms: 4,
        area: "3,200 sqft",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"],
        isNew: true,
        category: "Rent",
    },
    {
        title: "Classic Colonial Bungalow",
        type: "Bungalow",
        location: "Kenny Hills",
        price: "RM 15,000,000",
        bedrooms: 7,
        bathrooms: 8,
        area: "10,000 sqft",
        images: ["https://images.unsplash.com/photo-1600596542815-3ad30919236b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"],
        isNew: false,
        category: "Buy",
    },
    {
        title: "Modern Townhouse",
        type: "Townhouse",
        location: "Petaling Jaya",
        price: "RM 1,100,000",
        bedrooms: 3,
        bathrooms: 3,
        area: "1,800 sqft",
        images: ["https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"],
        isNew: true,
        category: "Buy",
    },
    {
        title: "Suburban Family Home",
        type: "Terrace",
        location: "Subang Jaya",
        price: "RM 2,800 / month",
        bedrooms: 4,
        bathrooms: 3,
        area: "2,000 sqft",
        images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"],
        isNew: false,
        category: "Rent",
    }
];

const seedDB = async () => {
    try {
        await Property.deleteMany({});
        console.log('Existing data removed');

        await Property.insertMany(seedProperties);
        console.log('Database seeded with 12 properties');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDB();
