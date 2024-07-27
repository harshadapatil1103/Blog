import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        console.log("not able to read token");
        return next(errorHandler(401,'unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            console.log("not able to read user");
            return next(errorHandler(401,'unAuthorized'));
        }
       
        req.user=user;
        // console.log(req.user);
        next();
    });



};