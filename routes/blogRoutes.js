import express from 'express';
const router = express.Router();
import { requireSignin } from '../middleware/middleware.js';
import { addNewBlogController, deleteBlogController, fetchAllBlogController, fetchSingleBlogController, updateBlogController } from '../controller/blogController.js';




// all blog
router.get('/fetch-all',requireSignin,fetchAllBlogController)
// fetch single blog
router.get('/fetch/:id',requireSignin,fetchSingleBlogController)

// add new
router.post('/add',requireSignin,addNewBlogController)
// update
router.put('/update/:id',requireSignin,updateBlogController)
// delete
router.delete('/delete/:id',requireSignin,deleteBlogController)





export default router;