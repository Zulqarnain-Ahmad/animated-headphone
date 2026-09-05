const express=require('express');
const router=express.Router();
const {getProducts,getProduct,addProduct}=require('../controllers/productController')
const validate=require('../middleware/validate');
const {  editProduct, removeProduct } = require('../controllers/productController');
const protect=require('../middleware/auth')
const isAdmin=require('../middleware/isAdmin')
const {upload,verifyFileContent}=require('../middleware/upload')
const {createProductSchema,updateProductSchema}=require('../validators/productValidator')
const {updatePaymentStatusSchema}=require('../validators/orderValidator')

router.get('/',getProducts)
router.get('/:id',getProduct)
router.post('/',protect,isAdmin,validate(createProductSchema),addProduct);
router.put('/:id', protect, isAdmin, validate(updateProductSchema), editProduct);
router.delete('/:id', protect, isAdmin, removeProduct);


router.post(
    '/upload-image',
    protect,
    isAdmin,
    upload.single('image'),
    verifyFileContent,
    (req,res)=>{
        if(!req.file){
            return res.status(400).json({status:'error',message:'No file uploaded'})
        }

    const imageUrl = `/uploads/products/${req.file.filename}`;
    res.status(200).json({status:'success',data:{imageUrl}})
    }
)


module.exports=router;