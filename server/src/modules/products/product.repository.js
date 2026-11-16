import Product from "./products.model.js";

const create=async(data)=>Product.create(data);
const findAll=async()=>Product.find();
const findById=async(id)=>Product.findById(id);
const findBySlug=async(slug)=>Product.findOne({slug});

const productRepository={create,findAll,findById,findBySlug};

export default productRepository;
