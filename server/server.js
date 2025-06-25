import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import workoutRoutes from "./routes/workouts.js";
import workoutInstanceRoutes from "./routes/workoutInstances.js";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/workoutInstances", workoutInstanceRoutes);

app.get("/", (req, res) => {

});



app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
