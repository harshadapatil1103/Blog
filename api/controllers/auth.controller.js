import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
export const signup= async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password ||username==='' ||email==='' ||password===''){
        next(errorHandler(400, 'All fields are required'));
    }
    try{
        const hashPassword=bcryptjs.hashSync(password,10);
        const newUser= new User({
            username,
            email,
            password:hashPassword,
        });
    
        await newUser.save();
        res.json({
            successful:true,
            message:"data inserted",
            data:newUser
        })
    }
catch(err){
    res.status(500).json({successful:false, message: err.message });
    next(err);
}
   
}