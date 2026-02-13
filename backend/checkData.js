const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');
const Job = require('./models/Job');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to DB');

        try {
            const propCount = await Property.countDocuments();
            console.log(`Properties count: ${propCount}`);

            const jobCount = await Job.countDocuments();
            console.log(`Jobs count: ${jobCount}`);

            if (propCount === 0) console.log('WARNING: No properties found!');
            if (jobCount === 0) console.log('WARNING: No jobs found!');

        } catch (e) {
            console.error(e);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error(err));
