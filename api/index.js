import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import dbconnect from './config/database.js';
//create instance 
const app=express();
//add middleware
app.use(express.json());
app.use('/api/user',userRoutes);
//to access env var
dotenv.config();
//connect db
dbconnect();
//run the server
app.listen(process.env.PORT || 5000,()=>{
    console.log("server is runningm ");
})