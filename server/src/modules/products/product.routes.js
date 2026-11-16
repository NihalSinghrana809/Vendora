import express from "express";
import {getProducts,getProduct,createProduct} from "./product.controller.js";
import {createProductSchema} from "./product.validation.js";
import Validate from "../../middlewares/validate.js";
import {authenticate,adminOnly} from "../../middlewares/authenticate.js";

const router=express.Router();

router.get("/",getProducts);
router.post("/",authenticate,adminOnly,Validate(createProductSchema),createProduct);
router.get("/:idOrSlug",getProduct);

export default router;
