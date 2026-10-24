import express from "express";
import {getProductById,getProducts,createProduct} from "../controllers/productController.js";
import {protect,adminOnly} from "../middlewares/protect.js";

const router=express.Router();

router.get("/",getProducts);
router.get("/:id",getProductById);
router.post("/",protect,adminOnly,createProduct)

export default router;