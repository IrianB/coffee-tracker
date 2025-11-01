import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();

// sample route
app.use('/api/users',userRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
