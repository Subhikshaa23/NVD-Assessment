import mongoose from "mongoose";
import { config } from "dotenv";


config();

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/');
        console.log(`DB Connected.`);
    } 

    catch (error) {
        console.log("Error: ", error.message);
    }
}

export { connectToDB };

  