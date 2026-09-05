const express = require('express');
const router = express.Router();
const { updateMe, updatePassword } = require('../controllers/userController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const { updateProfileSchema, changePasswordSchema } = require('../validators/userValidator');

router.put('/me',protect,validate(updateProfileSchema),updateMe);
router.put('/me/password',protect,validate(changePasswordSchema),updatePassword);

module.exports=router;