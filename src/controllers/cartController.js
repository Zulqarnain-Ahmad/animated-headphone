const {getOrCreateCart,addItemToCart,updateCartItem,removeCartItem}=require('../services/cartService');

const getCart=async(req,res,next)=>{
    try{
        const cart=await getOrCreateCart(req.userId);

        res.status(200).json({
            status:'success',
            data:cart
        })
    }
    catch(error){
        next(error);
    }
};

const addToCart=async(req,res,next)=>{
    try{
        const {productId,quantity}=req.body;
        const cart=await addItemToCart(req.userId,productId,quantity);
        res.status(200).json({status:'success',data:cart})
    }
    catch(error){
        next(error)
    }
}


const updateItem=async(req,res,next)=>{
    try{
        const {quantity}=req.body;
        const cart=await updateCartItem(req.userId,req.params.productId,quantity);
        res.status(200).json({status:'success',data:cart})
    }
    catch(error){
        next(error)
    }
}

const removeItem=async(req,res,next)=>{
    try{
        const cart=await removeCartItem(req.userId,req.params.productId);
        res.status(200).json({status:'success',data:cart})
    }catch(error){
        next(error);
    }
}

module.exports={getCart,addToCart,updateItem,removeItem}