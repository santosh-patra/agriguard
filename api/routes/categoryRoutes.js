import express from 'express';
import crypto from 'crypto'
const router = express.Router();
import multer from 'multer'
import { addNewCategoryController, deleteCategoryController, fetchAllCategoryController, fetchSingleCategoryController, updateCategoryController } from '../controller/categoryController.js';
import { requireSignin } from '../middleware/middleware.js';




// category all category
router.get('/fetch-all',requireSignin,fetchAllCategoryController)
// fetch single category
router.get('/fetch/:id',requireSignin,fetchSingleCategoryController)

// add new
router.post('/add',requireSignin,addNewCategoryController)
// update
router.put('/update/:id',requireSignin,updateCategoryController)
// delete
router.delete('/delete/:id',requireSignin,deleteCategoryController)





export default router;