import express from "express";
import {getAdminDashboard} from "../controllers/adminController.js";
import {authorizeRoles} from "../middlewares/authoriseRoles.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router=express.Router();

router.get("/dashboard",verifyToken,authorizeRoles("admin"),getAdminDashboard);

export default router;