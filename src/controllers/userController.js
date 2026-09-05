const {updateProfile,changePassword}=require('../services/userService')

const updateMe=async(req,res,next)=>{
    try{
        const user=await updateProfile(req.userId,req.body);
        res.status(200).json({status:'success',data:user});
    }catch(error){
        next(error);
    }
}

const updatePassword=async(req,res,next)=>{
    try{
        const {currentPassword,newPassword}=req.body;
        const result=await changePassword(req.userId,currentPassword,newPassword);
        res.status(200).json({status:'success',message:result.message})
    }catch(error){
        next(error)
    }
}

module.exports={updateMe,updatePassword}