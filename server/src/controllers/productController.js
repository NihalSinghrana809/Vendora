import mongoose from "mongoose";
import Product from "../models/Products.js";

const getProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const getProductById=async(req,res)=>{
    try{
        const {id}=req.params;

        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product=await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });
    }
    catch(error){
        return res.status(500).json({
			success:false,
			message:"Server error"
		});
    }
}

const createProduct=async(req,res)=>{
    try{
        const {
			name,
			description,
			brand,
			category,
			price,
			discountedPrice,
			stock,
			images,
			rating,
			numReviews,
			isFeatured
        }=req.body;

		const product=await Product.create({
			name,
			description,
			brand,
			category,
			price,
			discountedPrice,
			stock,
			images,
			rating,
			numReviews,
			isFeatured
		});

        return res.status(200).json({
            sucess: true,
            message: "Product created sucessfully",
            product
        });
    }
    catch(error){
        if(error.name==="ValidationError" || error.name==="CastError"){
			return res.status(400).json({
				success: false,
				message: error.message
			});
		}
        return res.status(500).json({
            sucess: false,
            message: "Server error"
        });
    }
}

export {getProducts,getProductById,createProduct};