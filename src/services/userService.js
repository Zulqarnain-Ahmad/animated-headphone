const User=require('../models/User');

const updateProfile=async(userId,updates)=>{
    if(updates.email){
        const existing=await User.findOne({email:updates.email});
        if(existing && existing._id.toString() !== userId){
            const error=new Error('email is already in use');
            error.statusCode=409;
            throw error;
        }
    }


    const user=await User.findByIdAndUpdate(userId,updates,{
        new:true,
        runValidators:true
    }).select('-password')

    return user;
}


const changePassword=async(userId,currentPassword,newPassword)=>{
    const user=await User.findById(userId);

    const isMatch=await user.comparePassword(currentPassword);
    if(!isMatch){
        const error=new Error('Current Password Is Incorrect');
        error.statusCode=401;
        throw error;
    }

    user.password=newPassword;
    await user.save();

    return {message:'Password updated succcessfully'}
}

module.exports={updateProfile,changePassword}