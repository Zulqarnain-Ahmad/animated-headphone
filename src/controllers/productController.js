const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}=require('../services/productService')

const getProducts=async(req,res,next)=>{
    try{
        const products=await getAllProducts();

        res.status(200).json({
            status:'success',
            count:products.length,
            data:products
        })
    }catch(error){
        next(error)
    }
}

const getProduct=async(req,res,next)=>{
    try{
       const product=await getProductById(req.params.id);

       res.status(200).json({
        status:'success',
        data:product
       })
    }catch(error){
        next(error)
    }
}

const addProduct=async(req,res,next)=>{
    try{
        const product=await createProduct(req.body);
        res.status(201).json({status:'success',data:product});
    }catch(error){
        next(error);
    }
}

const editProduct=async(req,res,next)=>{
    try{
        const product=await updateProduct(req.params.id,req.body);
        res.status(200).json({status:'success',data:product})
    }catch(error){
        next(error)
    }
}

const removeProduct=async(req,res,next)=>{
  try{
    await deleteProduct(req.params.id);
    res.status(200).json({status:'success',message:'Product deleted successfully'})
  }catch(error){
    next(error)
  }
}

module.exports = { getProducts, getProduct, addProduct, editProduct, removeProduct };