import express from "express";
import dotenv from "dotenv";

import connectDB from "./dbConnection.js";

import userRoute from "./routes/userRoute.js";
import recipeRoute from "./routes/recipeRoute.js";

import {
    logger,
    errorHandler
} from "./middleware.js";

dotenv.config();

const app = express();


// middleware
app.use(express.json());

app.use(logger);


// routes
app.use("/api/users", userRoute);

app.use("/api/recipes", recipeRoute);


// error middleware
app.use(errorHandler);


const PORT = process.env.PORT || 3000;


// database connection
connectDB()
    .then(() => {

        app.listen(PORT, () => {

            console.log(`Server running on ${PORT}`);

        });

    })
    .catch((err) => {

        console.log("Database Connection Failed");

        console.log(err.message);

    });