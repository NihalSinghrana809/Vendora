const errorHandler=(err,req,res,next)=>{
	let statusCode=err.statusCode || 500;
	let message=err.message || "Internal Server Error";

	if(err.name==="CastError"){
		statusCode=400;
		message="Invalid resource ID";
	}

	if(err.code===11000){
		statusCode=409;
		message="Resource already exists";
	}

	if(err.name==="ValidationError"){
		statusCode=400;
		message=Object.values(err.errors).map(error=>error.message).join(", ");
	}

	if(err.name==="JsonWebTokenError"){
		statusCode=401;
		message="Invalid authentication token";
	}

	if(err.name==="TokenExpiredError"){
		statusCode=401;
		message="Authentication token expired";
	}

	res.status(statusCode).json({
		success:false,
		message,
		...(process.env.NODE_ENV==="development" && {stack:err.stack})
	});
};

export default errorHandler;
