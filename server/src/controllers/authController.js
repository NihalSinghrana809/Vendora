import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register=async(req,res)=>{
    const {username,email,password}=req.body;

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

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                sucess: false,
                message: "Email and Password are required"
            });
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                sucess: false,
                message: "Invalid email"
            });
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                sucess: false,
                message: "Invalid password"
            });
        }
        
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        return res.status(200).json({
            sucess: true,
            message: "Login sucessful",
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch(error){
        return res.status(500).json({
            sucess: false,
            message: "Internal server error"
        });
    }
}