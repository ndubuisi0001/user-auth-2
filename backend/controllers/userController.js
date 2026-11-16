const {User}= require("../models");
const getMe = async (req, res, next)=> 
{
    try{
        const user = await
        User.findByPk(req.user.id, {
            attributes:{exclude:["password"]}
        });
        if (!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        return res.status (200).json({success:true, user});
    }catch (error){
        next(error);
    }
};
const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.findAll({attributes:{exclude:["password"]}});
        return res.status(200).json({success:true, count:users.length, users});
    }catch (error){
        next (error);
    }
};
const getUserById = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id, {attributes:{exclude:["password"]}});
        if (!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        return res.status(200).json ({success:true, user});
    }catch (error){
        next (error);
    }
};
const updateMe = async (req, res, next)=> {
    try{
        const {name ,email}= req.body;
        if (name === undefined && email === undefined){
            return res.status(400).json({success:false, message:"provide a name or email to update"});
        }
        if (req.body.role !== undefined) {
            return res.status (403).json({success:false, message:"You cannot change your role"});
        }
        const updates = {};
        if (name !== undefined){
            if (typeof name !== "string"||! name.trim()){
                return res.status(400).json({success:false, message: "Name cannot be empty"});
            }
            updates.name = name.trim();
        }
        if (email !== undefined ){
            if(typeof email !== "string"||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){
                return res.status(400).json({success:false, message:"please provide a valid email"});
            }
            const normalizedEmail = email.trim().toLowerCase();
            const existingUser = await User.findOne({
                where:{email:normalizedEmail}
            });
            if (existingUser && existingUser.id !== req.user.id){
                return res.status(409).json({success:false, message:"email is already in use"});
            }
            updates.email=normalizedEmail;
        }
        await User.update(updates, {where:{id:req.user.id}});
        const updatedUser = await User.findByPk(req.user.id, {
            attributes:{exclude:["password"]}
        });
        return res.status(200).json({success: true, message:"profile updated successfully",
            user:updatedUser
        });
    }catch (error){
        next(error);
    }
};
const deleteUser = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const user = await 
        User.findByPk(userId);
        if (!user){
            return res.status(404).json({success:false, message:"user not found"});
        }
        if (Number(userId) === req.user.id){
            return res.status(404).json({success:false, message:"You cannot delete your own account"});
        }
        await user.destroy();
        return res.status(200).json({success:true, message:"user deleted successfully"});
    }catch (error) {
        next (error);
    }
};
module.exports = {getMe, getAllUsers, getUserById, updateMe, deleteUser};