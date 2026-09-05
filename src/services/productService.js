const Product=require('../models/Product')

const getAllProducts=async()=>{
    const products=await Product.find().sort({createdAt:-1});
    return products;
}

const getProductById=async(id)=>{
    const product=await Product.findById(id);

    if(!product){
        const error=new Error('Product Not found');
        error.status=404;
        throw error;
    }

    return product; 
}

const createProduct=async(productData)=>{
    const product=await Product.create(productData);
    return product;
}

const updateProduct=async(id,updates)=>{
    const product=await Product.findByIdAndUpdate(id,updates,{
        new:true,
        runValidators:true
    })

    if(!product){
        const error=new Error('Product not found');
        error.statusCode=404;
        throw error;
    }

    return product;
}

const deleteProduct=async(id)=>{
    const product=await Product.findByIdAndDelete(id);

    if(!product){
        const error=new Error('Product not found');
        error.statusCode=404;
        throw error;
    }

    return product;
}


module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };