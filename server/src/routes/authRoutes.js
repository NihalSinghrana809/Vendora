import express from "express";
import {register} from "../controllers/authController.js";
import {registerSchema} from "../middlewares/authValidations.js";
import Validate from "../middlewares/Validate.js";

const router=express.Router();

router.post("/register",Validate(registerSchema),register);

export default router;
