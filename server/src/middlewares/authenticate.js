import jwt from "jsonwebtoken";
import User from "../modules/users/user.model.js";

export const authenticate=async(req,res,next)=>{
	try{
		const authHeader=req.headers.authorization;

		if(!authHeader||!authHeader.startsWith("Bearer ")){
			return res.status(401).json({
				success:false,
				message:"Authentication token is required"
			});
		}

		const token=authHeader.split(" ")[1];
		const decoded=jwt.verify(token,process.env.JWT_SECRET);

		const user=await User.findById(decoded.id).select("-password");

		if(!user){
			return res.status(401).json({
				success:false,
				message:"User not found"
			});
		}

		req.user=user;

		next();
	}catch(error){
		return res.status(401).json({
			success:false,
			message:"Invalid or expired token"
		});
	}
};

export const adminOnly=(req,res,next)=>{
	if(req.user&&req.user.role==="admin"){
		return next();
	}

	return res.status(403).json({
		success:false,
		message:"Access denied. Admin only."
	});
};