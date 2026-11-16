require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require ("./routes/authRoutes");
const express = require ("express");
const {testConnection}= require("./config/database");
const {sequelize} = require("./models");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
app.use (express.json());
app.use ("/api/users", userRoutes);
app.use ("/api/auth", authRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.get("/api/health", (req, res) => { res.status(200).json({success: true, message:"you've reached user authentication API, how can we help you"});});
const startServer = async () => {
    try{
        await testConnection();
        await sequelize.sync();
        console.log("Database tables synchronized.");
app.listen (PORT, ()=> { console.log("banzy your server is running");});
    }catch (error){
        console.error("server startup failed:", error.message);
        process.exit(1);
    }
};
startServer();
