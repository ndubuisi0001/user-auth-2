const bcrypt =  require ("bcrypt");
const {user} = require ("../models");
const register = async (req, res) => {
const {name, email, password}= req.body;
if (!name||!email||!password){return res.status(400).json({success:false, message:"Name, email and password are required"});}
if (existingUser){
    return res.status(409).json ({success:false, message:"Email is already registered"});
}
const hashedPassword = await bcrypt.hash(password, 10);
const newUser = await User.create({name, email, password: hashedPassword});
return res.status(201).json({success:true, message:"User registered successfully", 
    user:{
        id:newUserid, 
        name:newUser.name,
        email:newUser.email,
        role:newUser.role
    }
});
};
module.exports = { register };