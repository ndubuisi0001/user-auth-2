require("dotenv").config();
const express = require ("express");
const {testConnection}= require("./config/database");
const app = express();
app.use (express.json());
const PORT = process.env.PORT || 3000;
app.get("/api/health", (req, res) => { res.status(200).json({success: true, message:"you've reached user authentication API, how can we help you"});});
const startServer = async () => {
    try{
        await testConnection();
app.listen (PORT, ()=> { console.log("banzy your server is running");});
    }catch (error){
        console.error("server startup failed:", error.message);
        process.exit(1);
    }
};
startServer();
