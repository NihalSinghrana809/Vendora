export const getAdminDashboard=(req,res)=>{
    return res.status(200).json({
        success: true,
        message: "Welcome to Admin Dashboard",
        user: {
            id:req.currentUser._id,
            username:req.currentUser.username,
            role:req.currentUser.role
        }
    });
};