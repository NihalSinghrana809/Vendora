import express from "express";
import {authenticate} from "../../middlewares/authenticate.js";
import {authorizeRoles} from "../../middlewares/authorise.js";
import {getAdminDashboard} from "../../controllers/adminController.js";

const router=express.Router();

router.get("/dashboard",authenticate,authorizeRoles("admin"),getAdminDashboard);

export default router;