import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
export const test=(req,res)=>{
res.json({
    message:"api is working",
})
};

export const updateUser=async (req,res,next)=>{
  console.log("userid",req.user.id);
  console.log("param id",req.params.userId);
  // if (req.user.id !== req.params.userId)
  const userId = String(req.user.id).trim();
  const paramId = String(req.params.userId).trim();
  console.log(userId === paramId);
  console.log("userId length:", userId.length);
  console.log("paramId length:", paramId.length);

if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"not allow to update this"));
}
if(req.body.password){
  if(req.body.password.length<6){
    return next(errorHandler(400,"password must be at least 6 char"));
  }
  req.body.password=bcryptjs.hashSync(req.body.password,10);

}
if(req.body.username){
    if(req.body.username.length<5 || req.body.username.length>20){
        return next(errorHandler(400,"username must be between 7 and 20"));
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400,"username cannot contain spaces"));
    }
    if(req.body.username !==req.body.username.toLowerCase()){
        return next(errorHandler(400,"username must be lowercase"));
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400,"username can contain only letters and numbers "));
    }
    try{
      const updateUser=await User.findByIdAndUpdate(req.params.userId,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            profilePicture:req.body.profilePicture,
            password:req.body.password,
        }
      },{new:true});
      const {password,...rest}=updateUser._doc;
      res.status(200).json(rest);

    }
    catch(error){
          next(error);
    }


}


}

export const deleteUser=async(req,res,next)=>{
  const userId = String(req.user.id).trim();
  const paramId = String(req.params.userId).trim();
 

if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"not allow to deletethis"));
}
  try{
    const response=await User.deleteOne({_id:userId});
     console.log("user delated");
     res.json({
      success:true,
      message:"deleted successfully",
    
     })
  }

  catch(error){
    next(error);
  }

}

export const signout=async (req,res,next)=>{
  try{
    res.clearCookie('access_token').status(200).json({
      success:true,
      message:"user has been signed out"
    })

  }
  catch(error){
    next(error);

  }
};