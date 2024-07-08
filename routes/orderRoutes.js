import express from 'express';
import crypto from 'crypto'
const router = express.Router();
import multer from 'multer'
import { addNewOrderController, deleteOrderController, fetchAllOrderController, fetchOrderController, fetchSingleOrderController, getReportController, totalOrderCountController, updateOrderController } from '../controller/orderController.js';
import { requireSignin } from '../middleware/middleware.js';



// fetch order 
router.get('/fetch-total-order',requireSignin,fetchAllOrderController)
// fetch total no. of order
router.get('/fetch-total-count',requireSignin,totalOrderCountController)
// fetch single order
router.get('/fetch-order/:order_id',requireSignin,fetchSingleOrderController)
// add order
router.post('/add',requireSignin,addNewOrderController)
// update order
router.put('/update/:order_id',requireSignin,updateOrderController)
// delete order
router.delete('/delete/:order_id',requireSignin,deleteOrderController)

// fetch order by farmer_id
router.get('/order-by-farmer/:id',requireSignin,fetchOrderController)

// daily sales report by admin
router.post('/get-report',requireSignin,getReportController)





export default router;