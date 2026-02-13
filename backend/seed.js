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
        areaSize: 2200,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600596542815-3ad30919236b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/7578546/7578546-uhd_3840_2160_30fps.mp4"
        ],
        isNewLaunch: true,
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
        areaSize: 5000,
        images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/3760968/3760968-hd_1920_1080_25fps.mp4"
        ],
        isNewLaunch: false,
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
        areaSize: 600,
        images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1522771753035-4a50c8791bbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
        ],
        isNewLaunch: false,
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
        areaSize: 1800,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1558036117-15d82a90b9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/5334464/5334464-uhd_3840_2160_25fps.mp4"
        ],
        isNewLaunch: true,
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
        areaSize: 900,
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502005229766-939cb93c597d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/3196344/3196344-uhd_3840_2160_25fps.mp4"
        ],
        isNewLaunch: false,
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
        areaSize: 3500,
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/5524220/5524220-uhd_3840_2160_25fps.mp4"
        ],
        isNewLaunch: false,
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
        areaSize: 1500,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/7578546/7578546-uhd_3840_2160_30fps.mp4"
        ],
        isNewLaunch: false,
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
        areaSize: 6000,
        images: [
            "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/856958/856958-hd_1920_1080_25fps.mp4"
        ],
        isNewLaunch: false,
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
        areaSize: 3200,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1556912173-3db996ea0622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/3196344/3196344-uhd_3840_2160_25fps.mp4"
        ],
        isNewLaunch: true,
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
        areaSize: 10000,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600596542815-3ad30919236b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/3760968/3760968-hd_1920_1080_25fps.mp4"
        ],
        isNewLaunch: false,
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
        areaSize: 1800,
        images: [
            "https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1574362848149-11496d93e7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/5334464/5334464-uhd_3840_2160_25fps.mp4"
        ],
        isNewLaunch: true,
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
        areaSize: 2000,
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [
            "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
        ],
        isNewLaunch: false,
        category: "Rent",
    },
    {
        title: "Lakeside Semi-D",
        type: "Semi-D",
        location: "Cyberjaya",
        price: "RM 1,800,000",
        bedrooms: 5,
        bathrooms: 4,
        area: "3,200 sqft",
        areaSize: 3200,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600596542815-3ad30919236b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: true,
        category: "Buy",
    },
    // 10 New Properties
    {
        title: "Skyline Penthouse Suites",
        type: "Penthouse",
        location: "Bangsar",
        price: "RM 5,500,000",
        bedrooms: 4,
        bathrooms: 5,
        area: "4,500 sqft",
        areaSize: 4500,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: true,
        category: "New Launch",
    },
    {
        title: "Golden Triangle Condo",
        type: "Condo",
        location: "Bukit Bintang",
        price: "RM 3,500 / month",
        bedrooms: 2,
        bathrooms: 2,
        area: "1,100 sqft",
        areaSize: 1100,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: false,
        category: "Rent",
    },
    {
        title: "Tropical Garden Villa",
        type: "Villa",
        location: "Shah Alam",
        price: "RM 2,200,000",
        bedrooms: 5,
        bathrooms: 4,
        area: "3,800 sqft",
        areaSize: 3800,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: false,
        category: "Buy",
    },
    {
        title: "Seaview Residence",
        type: "Apartment",
        location: "Penang",
        price: "RM 900,000",
        bedrooms: 3,
        bathrooms: 2,
        area: "1,400 sqft",
        areaSize: 1400,
        images: [
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: true,
        category: "New Launch",
    },
    {
        title: "Elite Heights",
        type: "Condo",
        location: "Bayan Lepas",
        price: "RM 2,800 / month",
        bedrooms: 3,
        bathrooms: 2,
        area: "1,250 sqft",
        areaSize: 1250,
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: false,
        category: "Rent",
    },
    {
        title: "Grand Manor",
        type: "Bungalow",
        location: "Country Heights",
        price: "RM 8,000,000",
        bedrooms: 7,
        bathrooms: 8,
        area: "8,500 sqft",
        areaSize: 8500,
        images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: false,
        category: "Buy",
    },
    {
        title: "The Oval Kuala Lumpur",
        type: "Serviced Residence",
        location: "KL City Centre",
        price: "RM 3,300,000",
        bedrooms: 3,
        bathrooms: 4,
        area: "3,897 sqft",
        areaSize: 3897,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: false,
        category: "Buy",
    },
    {
        title: "Pavilion Suites",
        type: "Serviced Residence",
        location: "Bukit Bintang",
        price: "RM 6,000 / month",
        bedrooms: 1,
        bathrooms: 1,
        area: "718 sqft",
        areaSize: 718,
        images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: false,
        category: "Rent",
    },
    {
        title: "Eco Sanctuary",
        type: "Semi-D",
        location: "Kota Kemuning",
        price: "RM 1,600,000",
        bedrooms: 4,
        bathrooms: 5,
        area: "2,743 sqft",
        areaSize: 2743,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: true,
        category: "New Launch",
    },
    {
        title: "Sunway Geo Sense",
        type: "Condo",
        location: "Bandar Sunway",
        price: "RM 950,000",
        bedrooms: 2,
        bathrooms: 2,
        area: "956 sqft",
        areaSize: 956,
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502005229766-939cb93c597d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        ],
        videos: [],
        isNewLaunch: false,
        category: "Buy",
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
