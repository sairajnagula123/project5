// dbConnection.js

import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
    try {
        await connect(dbUrl);

        console.log("MongoDB Connected...");
    } 
    catch (err) {
        console.log("Error while connecting to DB");
        process.exit(1);
    }
};

export default connectDB;