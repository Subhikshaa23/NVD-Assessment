import mongoose from "mongoose";
import { config } from "dotenv";


config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database is connected`);
    } 

    catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
}

export { connectToDB };

  