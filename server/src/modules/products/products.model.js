
import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	slug: {
		type: String,
		required: true,
		unique: true,
		index: true
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

// Generate slug automatically before validation
productSchema.pre("validate",async function(){
	if(!this.isModified("name") && this.slug) return;

	if(!this.name){
		return;
	}

	const Product=mongoose.model("Product");

	const baseSlug=this.name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g,"-")
		.replace(/^-+|-+$/g,"");

	let slug=baseSlug;
	let counter=1;

	const filter={slug};

	if(this._id){
		filter._id={$ne:this._id};
	}

	while(await Product.exists(filter)){
		slug=`${baseSlug}-${counter}`;
		filter.slug=slug;
		counter++;
	}

	this.slug=slug;
});

const Product=mongoose.model("Product",productSchema);

export default Product;