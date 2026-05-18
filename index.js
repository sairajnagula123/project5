import express from "express";
import { config } from "dotenv";

import connectDB from "./dbconnection.js";

import userRoutes from "./routes/UserRoute.js";
import recipeRoutes from "./routes/recipeRoute.js";

import { errorHandle, Logger } from "./middleware/middleware.js";

config();

const app = express();

const port = process.env.PORT || 3000;
const uri = process.env.DB_URL;

app.use(express.json());

// Middleware
app.use(Logger);

// Routes
app.use("/u", userRoutes);

app.use("/recipes", recipeRoutes);

// Error Middleware
app.use(errorHandle);

const startServer = async () => {
  try {
    await connectDB(uri);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Server not started..");
  }
};

startServer();