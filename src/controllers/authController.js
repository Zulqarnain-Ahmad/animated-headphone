const {signupUser, loginUser}=require('../services/authService')
const generateToken=require('../utils/generateToken')
const User=require('../models/User')

const signup=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const user=await signupUser({name,email,password});

        res.status(201).json({
            status:'success',
            message:'Account Created Successfully',
            data:user
        })
    }catch(error){
        next(error)
    }
}


const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await loginUser({email,password});

        const token=generateToken(user.id);

        res.cookie('token',token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        res.status(200).json({
            status:'success',
            message:'Logged in successfully',
            data:user
        });
    }
    catch(error){
        next(error);
    }
}


const getMe=async(req,res,next)=>{
    try{
        const user=await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({status:'error',message:'User Not Found'})
        }

        res.status(200).json({
            status:'success',
            data:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch(error){
        next(error);
    }
}


const logout=(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict'
    });

    res.status(200).json({
        status:'success',
        message:'logged out successfully'
    })
}

module.exports={signup,login,getMe,logout}