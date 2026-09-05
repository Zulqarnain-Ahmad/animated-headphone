const { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, updatePaymentStatus } = require('../services/orderService');

const placeOrder=async(req,res,next)=>{
    try{
        const {shippingAddress}=req.body;
        const order=await createOrder(req.userId,shippingAddress);

        res.status(201).json({status:'success',data:order})
    }catch(error){
        next(error);
    }
}

const getOrders=async(req,res,next)=>{
    try{
        const orders=await getMyOrders(req.userId);
        res.status(200).json({status:'success',count:orders.length,data:orders});

    }catch(error){
        next(error);
    }
}


const getOrder=async(req,res,next)=>{
    try{
        const order=await getOrderById(req.userId,req.params.id);
        res.status(200).json({status:'success',data:order})
    }catch(error){
        next(error)
    }
}

const getAdminOrders=async(req,res,next)=>{
    try{
        const orders=await getAllOrders();
        res.status(200).json({status:'success',count:orders.length,data:orders});

    }
    catch(error){
        next(error)
    }
}

const updateStatus=async(req,res,next)=>{
    try{
        const order=await updateOrderStatus(req.params.id,req.body.status);
        res.status(200).json({status:'success',data:order})
    }catch(error){
        next(error)
    }
}

const updatePayment=async(req,res,next)=>{
    try{
        const order=await updatePaymentStatus(req.params.id,req.body.paymentStatus);
        res.status(200).json({status:'success',data:order})
    }catch(error){
        next(error)
    }
}

module.exports = { placeOrder, getOrders, getOrder, getAdminOrders, updateStatus, updatePayment };