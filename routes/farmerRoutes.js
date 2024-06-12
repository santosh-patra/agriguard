import express from 'express';
import crypto from 'crypto'
const router = express.Router();
import multer from 'multer'
import { addNewFarmerController, deleteFarmerController, fetchSingleFarmerController, fetchTotalFarmerController, totalFarmerCountController, updateFarmerController } from '../controller/farmerController.js';
import { requireSignin } from '../middleware/middleware.js';



// farmer all farmer
router.get('/fetch-total-farmer',requireSignin,fetchTotalFarmerController)
// fetch total count of farmer
router.get('/fetch-total-count',requireSignin,totalFarmerCountController)
// fetch single farmer details
router.get('/fetch/:id',requireSignin,fetchSingleFarmerController)
// add-new-Farmer
router.post('/add',requireSignin,addNewFarmerController)
// update farmer details by id
router.put('/update/:id',requireSignin,updateFarmerController)
// delete farmer by id
router.delete('/delete/:id',requireSignin,deleteFarmerController)




export default router;