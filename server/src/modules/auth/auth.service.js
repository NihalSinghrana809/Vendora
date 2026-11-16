import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../users/user.repository.js";

const httpError=(message,statusCode=400)=>{
	const error=new Error(message);
	error.statusCode=statusCode;
	return error;
};

const register=async({username,email,password})=>{
	const existingUser=await userRepository.findByEmail(email);

	if(existingUser){
		throw httpError("User already exists",409);
	}

	const hashedPassword=await bcrypt.hash(password,10);

	return userRepository.create({
		username,
		email,
		password:hashedPassword
	});
};

const login=async({email,password})=>{
	const user=await userRepository.findByEmail(email,{withPassword:true});

	if(!user){
		throw httpError("Invalid email or password",401);
	}

	const isPasswordValid=await bcrypt.compare(password,user.password);

	if(!isPasswordValid){
		throw httpError("Invalid email or password",401);
	}

	const token=jwt.sign(
		{id:user._id},
		process.env.JWT_SECRET,
		{expiresIn:"1d"}
	);

	return {token,user};
};

const getMe=async(id)=>{
	const user=await userRepository.findById(id);

	if(!user){
		throw httpError("User not found",404);
	}

	return user;
};

const authService={
	register,
	login,
	getMe
};

export default authService;
