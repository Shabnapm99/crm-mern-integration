import mongoose from 'mongoose';
import dotenv from'dotenv';

dotenv.config();//loads the .env variables

export async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);//configuring connection to DB
        console.log('DB connected successfully!!!');
    } catch (error) {
        console.log(`Error happened while connecting to DB ${error.message}`);
    }
}
