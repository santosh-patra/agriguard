import express from 'express';
const router = express.Router();
import { requireSignin } from '../middleware/middleware.js';
import { addNewAttributeController, deleteAttributeController, fetchAllAttributeController, fetchSingleAttributeController, updateAttributeController } from '../controller/attributeController.js';




// all attribute
router.get('/fetch-all',requireSignin,fetchAllAttributeController)
// fetch single attribute
router.get('/fetch/:id',requireSignin,fetchSingleAttributeController)

// add new
router.post('/add',requireSignin,addNewAttributeController)
// update
router.put('/update/:id',requireSignin,updateAttributeController)
// delete
router.delete('/delete/:id',requireSignin,deleteAttributeController)





export default router;