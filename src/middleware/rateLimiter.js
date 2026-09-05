const rateLimit=require('express-rate-limit');
const MongoStore=require('rate-limit-mongo');

const authLimiter=rateLimit({
    windowMs:15*60*1000,
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    store:new MongoStore({
        uri:process.env.MONGO_URI,
        collectionName:'rateLimits',
        expireTimeMs:15*60*1000
    }),
    message:{
        status:'error',
        message:'Too many attempts.Please try again later'
    }
});

module.exports=authLimiter;