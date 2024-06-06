import express from 'express';
import crypto from 'crypto'
const router = express.Router();
import multer from 'multer'
import { fetchTotalFarmerController, getTestController } from '../controller/farmerController.js';
import { requireSignin } from '../middleware/middleware.js';



// test a product with db operation
router.get('/test', getTestController);
// farmer 
router.get('/fetch-total-farmer',requireSignin,fetchTotalFarmerController)





export default router;