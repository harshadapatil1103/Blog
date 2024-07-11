import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app=express();

app.use(express.json());

dotenv.config();
mongoose.connect(process.env.MONGO)
.then((req,res)=>{
console.log("connected successfully");

})
.catch((err)=>{
    console.error(err);
    console.log("error occured");

})

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is runningm ");
})