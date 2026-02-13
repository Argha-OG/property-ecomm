const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected for Job Seeding'))
    .catch(err => console.log(err));

const seedJobs = [
    {
        title: "Senior Real Estate Agent",
        type: "Full-time",
        location: "Kuala Lumpur",
        salary: "RM 5,000 - RM 10,000 + Commission",
        description: "We are looking for an experienced Real Estate Agent to join our high-performing team. You will be responsible for managing listings, conducting viewings, and closing deals.",
        requirements: ["3+ years of experience", "Valid REN tag", "Strong communication skills", "Own transport"],
        status: "Active"
    },
    {
        title: "Property Manager",
        type: "Full-time",
        location: "Mont Kiara",
        salary: "RM 4,500 - RM 6,000",
        description: "Oversee the daily operations of our managed properties. Tasks include tenant relations, maintenance coordination, and rent collection.",
        requirements: ["Experience in property management", "Detail-oriented", "Problem-solving skills"],
        status: "Active"
    },
    {
        title: "Marketing Intern",
        type: "Internship",
        location: "Remote / Hybrid",
        salary: "RM 1,000 allowance",
        description: "Assist our marketing team with social media campaigns, content creation, and lead generation strategies.",
        requirements: ["Marketing or Mass Comm student", "Social media savvy", "Creativity"],
        status: "Active"
    }
];

const seedDB = async () => {
    try {
        await Job.deleteMany({}); // Optional: Clear existing jobs if you want a fresh start
        console.log('Existing jobs removed');

        await Job.insertMany(seedJobs);
        console.log('Database seeded with 3 jobs');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDB();
