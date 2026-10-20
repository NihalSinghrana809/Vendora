import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
	category: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	discountedPrice: {
		type: Number,
		required: true,
		min: 0
	},
	stock: {
		type: Number,
		required: true,
		min: 0,
		default: 0
	},
	images: {
		type: [String],
		default: []
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	numReviews: {
		type: Number,
		min: 0,
		default: 0
	},
	isFeatured: {
		type: Boolean,
		default: false
	}
});

const Product=mongoose.model("Product",productSchema);

export default Product;