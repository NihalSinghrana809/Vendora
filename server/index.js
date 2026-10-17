import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

export default app;
