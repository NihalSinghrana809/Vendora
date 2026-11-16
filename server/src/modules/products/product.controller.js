import mongoose from "mongoose";
import productService from "./product.service.js";

const getProducts=async(req,res)=>{
	const products=await productService.getProducts();

	return res.status(200).json({
		success:true,
		count:products.length,
		products
	});
};

const getProduct=async(req,res)=>{
	const {idOrSlug}=req.params;

	const product=mongoose.isObjectIdOrHexString(idOrSlug)
		? await productService.getProductById(idOrSlug)
		: await productService.getProductBySlug(idOrSlug);

	return res.status(200).json({
		success:true,
		product
	});
};

const createProduct=async(req,res)=>{
	const product=await productService.createProduct(req.body);

	return res.status(201).json({
		success:true,
		message:"Product created successfully",
		product
	});
};

export {getProducts,getProduct,createProduct};
