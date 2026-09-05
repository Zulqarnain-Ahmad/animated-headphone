const express=require('express');
const router=express.Router();
const {signup,login,getMe,logout}=require('../controllers/authController');
const validate=require('../middleware/validate');
const {signupSchema,loginSchema}=require('../validators/authValidator')
const authLimiter=require('../middleware/rateLimiter');
const protect=require('../middleware/auth')


router.post('/signup',authLimiter,validate(signupSchema),signup)
router.post('/login',authLimiter,validate(loginSchema),login)
router.get('/me',protect,getMe)
router.post('/logout',logout)



module.exports=router;
