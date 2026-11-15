import express from "express";
import {getProductById,getProducts,createProduct} from "./product.controller.js";
import {authenticate,adminOnly} from "../../middlewares/authenticate.js";

const router=express.Router();

router.get("/",getProducts);
router.get("/:id",getProductById);
router.post("/",authenticate,adminOnly,createProduct);

export default router;