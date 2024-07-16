import express from 'express'
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import dbconnect from './config/database.js';
import authRoute from './routes/auth.route.js'
import cors from 'cors';
//create instance of 
const app=express();
// const corsOptions={
//   origin:"http://127.0.0.1:5173",
//   methods:"GET POST",
//   credentials:true,
// }
//add middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend server URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));


// app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoute);
//to access env var
dotenv.config();
//connect db
dbconnect();
//run the server

//middleware to handle error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 300;
    const message = err.message || 'Internal  Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  })