const express=require('express');
const router=express.Router();
const {getCart,addToCart,updateItem,removeItem}=require('../controllers/cartController');
const protect=require('../middleware/auth')
const validate=require('../middleware/validate')
const {addToCartSchema,updateCartSchema}=require('../validators/cartValidator')

router.get('/',protect,getCart);
router.post('/',protect,validate(addToCartSchema),addToCart)
router.put('/:productId',protect,validate(updateCartSchema),updateItem);
router.delete('/:productId',protect,removeItem)


module.exports=router;


