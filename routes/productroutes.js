import express from 'express';
import crypto from 'crypto'
const router = express.Router();
import multer from 'multer'
import { addNewProductController, fetchProductController, getTestController } from '../controller/productController.js';
import { requireSignin } from '../middleware/middleware.js';



// test a product with db operation
router.get('/test', getTestController);
// fetch product
router.get('/fetch-all',requireSignin,fetchProductController)
// add-new-product
router.post('/add',requireSignin,addNewProductController)




export default router;