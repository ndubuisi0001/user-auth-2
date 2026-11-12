const bcrypt =  require ("bcrypt");
const {User} = require ("../models");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    console.log("Registration controller reached");
    console.log ("Request body:", req.body);
const {name, email, password} = req.body;
if (
    typeof name !== "string"||
    typeof email !== "string"||
    typeof password !== "string"||
    !name.trim()||
    !email.trim()||
    !password
){
    return res.status(400).json({success:false, message:"Name, email and password are required"});}
const existingUser = await User.findOne({where:{
    email:email.trim().toLowerCase()
}
});
if (existingUser){
    return res.status(409).json ({success:false, message:"Email is already registered"});}

const hashedPassword = await bcrypt.hash(password, 10);
const userData  = {
    name: name.trim(),
     email: email.trim().toLowerCase(),
      password: hashedPassword
    };
    console.log("Data sent to sequelize:", userData);
    console.log ("Model fields:", Object.keys(User.rawAttributes));
    const newUser = await User.create (userData);
    console.log ("Created user:", newUser.toJSON());
    console.log ("Generated ID:", newUser.id);
return res.status(201).json({success:true, message:"User registered successfully", 
    user:{
        id:newUser.id, 
        name:newUser.name,
        email:newUser.email,
        role:newUser.role
    }
    
});
};
const login = async (req, res) => { const {email, password} = req.body;
if(
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim()||
    !password
){
    return res.status(400).json({success:false, message:"Email and password are required"});
}
const user = await User.findOne({
    where:{
        email:
        email.trim().toLowerCase()
    }
});
if (!user){
    return res.status(401).json({success:false, message:"invalid email or password"});
}
const isPasswordValid = await bcrypt.compare(
    password,
    user.password
);
if (!isPasswordValid){
    return res.status(401).json({success:false, message:"invalid email or password"});
}
const token = jwt.sign(
    {id:user.id},
    process.env.JWT_SECRET,
    {
        expiresIn:
        process.env.JWT_EXPIRES_IN ||"1h"
    }
);
return res.status(200).json({success:true, message:"login successful", token, 
    user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }
});
};
module.exports = { register, login };