import User from "./user.model.js";

const create=async(data)=>User.create(data);

const findByEmail=async(email,{withPassword=false}={})=>{
	const query=User.findOne({email});

	return withPassword?query:query.select("-password");
};

const findById=async(id,{withPassword=false}={})=>{
	const query=User.findById(id);

	return withPassword?query:query.select("-password");
};

const userRepository={
	create,
	findByEmail,
	findById
};

export default userRepository;
