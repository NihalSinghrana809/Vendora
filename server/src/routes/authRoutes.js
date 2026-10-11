import express from "express";
import {login, register} from "../controllers/authController.js";
import {registerSchema} from "../middlewares/authValidations.js";
import Validate from "../middlewares/Validate.js";
import {verifyToken} from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router=express.Router();

router.post("/register",Validate(registerSchema),register);
router.post("/login",login);
router.get("/me",verifyToken,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                sucess: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            sucess: true,
            user
        });
    }
    catch(error){
        return res.status(500).json({
            sucess: false,
            message: "Internal server error"
        });
    }
});

export default router;
