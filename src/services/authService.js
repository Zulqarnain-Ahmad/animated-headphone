const User = require('../models/User');

const signupUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email is already registered');
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

const loginUser=async({email,password})=>{
  const user=await User.findOne({email});

  if(!user){
    const error=new Error('Invalid email or password')
    error.statusCode=401;
    throw error;
  }

  const isMatch=await user.comparePassword(password);
  if(!isMatch){
    const error=new Error('Invalid email or password');
    error.statusCode=401;
    throw error;
  }

  return{
    id:user._id,
    name:user.name,
    email:user.email,
    role:user.role
  }

}

module.exports = { signupUser,loginUser };