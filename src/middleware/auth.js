const jwt=require('jsonwebtoken');

const protect=(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({status:'error',message:'Not Authenticated'})
    }

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    }catch(error){
        return res.status(401).json({status:'error',message:'Invalid or expired token'})
    }
}

module.exports=protect;