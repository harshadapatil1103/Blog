import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbconnect= async () =>{
    try{
    mongoose.connect(process.env.MONGO)
    .then(()=>{console.log("db connected succesfully");})
    .catch((err)=>{
     console.error(err);
     console.log("db facing issues");
     process.exit(1);
    })
}
catch(error){
    console.log("error while connecting db");
}
};

export default dbconnect;