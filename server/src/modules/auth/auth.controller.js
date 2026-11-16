import authService from "./auth.service.js";

const toPublicUser=(user)=>({
	id:user._id,
	username:user.username,
	email:user.email,
	role:user.role
});

const register=async(req,res)=>{
	const user=await authService.register(req.body);

	return res.status(201).json({
		success:true,
		message:"User registered successfully",
		user:toPublicUser(user)
	});
};

const login=async(req,res)=>{
	const {token,user}=await authService.login(req.body);

	return res.status(200).json({
		success:true,
		message:"Login successful",
		token,
		user:toPublicUser(user)
	});
};

const getMe=async(req,res)=>{
	const user=await authService.getMe(req.user.id);

	return res.status(200).json({
		success:true,
		user
	});
};

export {register,login,getMe};
