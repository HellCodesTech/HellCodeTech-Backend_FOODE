
const vendorController=require('../controllers/vendorControllers')
const express=require('express')

const router=express.Router();

//
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin)
//gets
router.get('/all-vendors',vendorController.getAllVendors)
router.get('/vendor/:id',vendorController.getVendorById)
module.exports=router;