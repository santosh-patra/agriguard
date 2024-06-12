import express from 'express';
import crypto from 'crypto'
const router = express.Router();
import multer from 'multer'
import { addNewOrderController, deleteOrderController, fetchAllOrderController, fetchSingleOrderController, totalOrderCountController, updateOrderController } from '../controller/orderController.js';
import { requireSignin } from '../middleware/middleware.js';



// fetch order 
router.get('/fetch-total-order',requireSignin,fetchAllOrderController)
// fetch total no. of order
router.get('/fetch-total-count',requireSignin,totalOrderCountController)
// fetch single order
router.get('/fetch-order/:id',requireSignin,fetchSingleOrderController)
// add order
router.post('/add',requireSignin,addNewOrderController)
// update order
router.put('/update/:id',requireSignin,updateOrderController)
// delete order
router.delete('/delete/:id',requireSignin,deleteOrderController)





export default router;