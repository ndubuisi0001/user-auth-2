const bcrypt =  require ("bcrypt");
const {User} = require ("../models");
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
module.exports = { register };