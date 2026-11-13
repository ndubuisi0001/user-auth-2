const jwt = require ("jsonwebtoken");
const {User} = require("../models");
const authenticate = async (req, res, next) => {
    try{
        const authHeader = 
        req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({success:false, message:"Access denied. No token provided."});
        }
        const token = authHeader.split(" ")[1];
        console.log("JWT sections:", token? token.split(".").length:0);
        console.log("JWT length:", token ? token.length :0);
        const decoded = jwt.verify (token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user){
            return res.status(401).json({success:false, message:"User no longer exists."});
        }
        req.user = user;
        next();
    }catch (error){
        console.error("JWT ERROR:", error.name, error.message);
        return res.status(401).json({success:false, message:"invalid or expired token."});
    }
};
module.exports=authenticate;