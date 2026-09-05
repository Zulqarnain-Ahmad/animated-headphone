const User=require('../models/User')

const isAdmin=async(req,res,next)=>{
    try{
        const user=await User.findById(req.userId);

        if(!user || user.role !== 'admin'){
            return res.status(403).json({
                status:'error',
                message:'Access denied.Admins only.'
            });
        }
        next();
    }
    catch(error){
        next(error)
    }
}

module.exports=isAdmin;