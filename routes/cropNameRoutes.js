import express from 'express';
const router = express.Router();
import { requireSignin } from '../middleware/middleware.js';
import { addNewCropNameController, deleteCropNameController, fetchAllCropNameController, fetchSingleCropNameController, updateCropNameController } from '../controller/cropNameController.js';




// fetch all CropName
router.get('/fetch-all',requireSignin,fetchAllCropNameController)
// fetch single cropName
router.get('/fetch/:id',requireSignin,fetchSingleCropNameController)

// add new
router.post('/add',requireSignin,addNewCropNameController)
// update
router.put('/update/:id',requireSignin,updateCropNameController)
// delete
router.delete('/delete/:id',requireSignin,deleteCropNameController)





export default router;