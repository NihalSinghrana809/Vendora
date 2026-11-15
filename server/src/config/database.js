import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

// Node's resolver can be misconfigured on Windows (c-ares reports 127.0.0.1), so allow an explicit override.
const dnsServers=(process.env.DNS_SERVERS||"")
    .split(",")
    .map(server=>server.trim())
    .filter(Boolean);

if(dnsServers.length){
    dns.setServers(dnsServers);
}

const connectDB=async()=>{
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("MONGODB_URI is missing in .env");
        }
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error("MongoDB Connection Error:",error.message);
        process.exit(1);
    }
};

export default connectDB;
