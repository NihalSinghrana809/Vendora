import express from "express";
import {getProductById,getProducts,createProduct} from "./product.controller.js";
import {createProductSchema} from "./product.validation.js";
import Validate from "../../middlewares/validate.js";
import {authenticate,adminOnly} from "../../middlewares/authenticate.js";

const router=express.Router();

router.get("/",getProducts);
router.get("/:id",getProductById);
router.post("/",authenticate,adminOnly,Validate(createProductSchema),createProduct);

export default router;