import express from "express";
import {login,register,getMe} from "./auth.controller.js";
import {registerSchema,loginSchema} from "./auth.validations.js";
import Validate from "../../middlewares/validate.js";
import {authenticate} from "../../middlewares/authenticate.js";

const router=express.Router();

router.post("/register",Validate(registerSchema),register);
router.post("/login",Validate(loginSchema),login);
router.get("/me",authenticate,getMe);

export default router;
