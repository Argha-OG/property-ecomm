const mongoose = require('mongoose');
const Property = require('./models/Property');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://arghacypher_db_user:Dh2P0NFtC6LuDyWG@cluster0.kxa3aun.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        try {
            const count = await Property.countDocuments();
            console.log(`Total Properties: ${count}`);

            const sample = await Property.findOne();
            console.log('Sample Property:', sample);

        } catch (err) {
            console.error('Error querying DB:', err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
    });
