import express from "express";
import { config } from "dotenv";
import { connectDB } from "./dbconnection.js";
import userRoutes from "./routes/UserRoutes.js";
import { errorHandle, Logger } from "./middleware.js";
config();

const app = express();

const port = process.env.PORT || 3000;
const uri = process.env.DB_URL;

app.use(express.json());

// Routes
app.use(Logger);
app.use("/u", userRoutes);

app.use(errorHandle);

const startServer = async (params) => {
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
