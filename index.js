import express from "express";
import dotenv from "dotenv";

import connectDB from "./dbConnection.js";

import userRoute from "./routes/userRoute.js";
import recipeRoute from "./routes/recipeRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);

app.use("/api/recipes", recipeRoute);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}).catch(()=>{
    console.log(`Server does start yet due to some technical glitch`);
})