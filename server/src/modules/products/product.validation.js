import {z} from "zod";

const productFields={
	name: z.string().trim().min(1,"Product name is required"),
	description: z.string().trim().min(1,"Product description is required"),
	brand: z.string().trim().min(1,"Brand is required"),
	category: z.string().trim().min(1,"Category is required"),
	price: z.number().min(0,"Price cannot be negative"),
	discountedPrice: z.number().min(0,"Discounted price cannot be negative"),
	stock: z.number().int().min(0,"Stock cannot be negative"),
	images: z.array(z.string().trim().min(1,"Image URL cannot be empty")),
	rating: z.number().min(0).max(5,"Rating must be between 0 and 5"),
	numReviews: z.number().int().min(0,"Number of reviews cannot be negative"),
	isFeatured: z.boolean()
};

export const createProductSchema=z.object({
	...productFields,
	stock: productFields.stock.default(0),
	images: productFields.images.default([]),
	rating: productFields.rating.default(0),
	numReviews: productFields.numReviews.default(0),
	isFeatured: productFields.isFeatured.default(false)
})
	.strict()
	.refine(data=>data.discountedPrice<=data.price,{
		message: "Discounted price cannot exceed original price",
		path: ["discountedPrice"]
	});

export const updateProductSchema=z.object({
	name: productFields.name.optional(),
	description: productFields.description.optional(),
	brand: productFields.brand.optional(),
	category: productFields.category.optional(),
	price: productFields.price.optional(),
	discountedPrice: productFields.discountedPrice.optional(),
	stock: productFields.stock.optional(),
	images: productFields.images.optional(),
	rating: productFields.rating.optional(),
	numReviews: productFields.numReviews.optional(),
	isFeatured: productFields.isFeatured.optional()
})
	.strict()
	.refine(data=>Object.keys(data).length>0,{
		message: "At least one field is required for update"
	})
	.refine(data=>{
		if(data.price!==undefined&&data.discountedPrice!==undefined){
			return data.discountedPrice<=data.price;
		}
		return true;
	},{
		message: "Discounted price cannot exceed original price",
		path: ["discountedPrice"]
	});

export const productIdSchema=z.object({
	id: z.string().regex(/^[0-9a-fA-F]{24}$/,"Invalid product ID")
}).strict();
