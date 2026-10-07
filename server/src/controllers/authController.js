import bcrypt from "bcrypt";
import User from "../models/User.js";

export const register=async(req,res)=>{
    const {username,email,password} = req.body;

    const existingUser=await User.findOne({email});

    if(existingUser){
        return res.status(409).json({
            message: "User already exists"
        });
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        username,
        email,
        password: hashedPassword
    });

    return res.status(201).json({
        message: "User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
} 
