import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import employeeRoutes from "../Backend/Routes/employeeRoutes.js";
import LeaveRoutes from "../Backend/Routes/LeaveRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    }
    catch(error){
        console.log(error);
    }
};

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {res.send('server is running')})

//ROUTES

app.use("/api/employees", employeeRoutes)
app.use("/api/leave", LeaveRoutes)
app.use("/api/auth",authRoutes)


console.log("sfd");

connectDB()

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})