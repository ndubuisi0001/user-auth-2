const {User}= require("../models");
const getMe = async (req, res, next)=> 
{
    try{
        const user = await
        User.findBypk(req.user.id, {
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
module.exports = {getMe};