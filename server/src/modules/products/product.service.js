import mongoose from "mongoose";
import productRepository from "./product.repository.js";

const httpError=(message,statusCode=400)=>{
	const error=new Error(message);
	error.statusCode=statusCode;
	return error;
};

const getProducts=async()=>productRepository.findAll();

const getProductById=async(id)=>{
	if(!mongoose.isValidObjectId(id)){
		throw httpError("Invalid product ID",400);
	}

	const product=await productRepository.findById(id);

	if(!product){
		throw httpError("Product not found",404);
	}

	return product;
};

const getProductBySlug=async(slug)=>{
	const product=await productRepository.findBySlug(slug);

	if(!product){
		throw httpError("Product not found",404);
	}

	return product;
};

const createProduct=async(data)=>productRepository.create(data);

const productService={
	getProducts,
	getProductById,
	getProductBySlug,
	createProduct
};

export default productService;
