import express from "express";
import {login, register} from "./auth.controller.js";
import {registerSchema} from "./auth.validations.js";
import Validate from "../../middlewares/validate.js";
import {authenticate} from "../../middlewares/authenticate.js";
import User from "../users/user.model.js";

const router=express.Router();

router.post("/register",Validate(registerSchema),register);
router.post("/login",login);
router.get("/me",authenticate,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router;
