import mongoose from 'mongoose';


const dbUrl = process.env.DB_URL as string;

if (!dbUrl) {
    throw new Error('Please define the DB_URL environment variable inside .env.local');
}

async function connectToDatabase() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Database connection successful!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

export default connectToDatabase;
