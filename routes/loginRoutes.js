import express from 'express';
const router = express.Router();
import { requireSignin } from '../middleware/middleware.js';
import { createUserController, loginController, sendOtpController, verifyOtpController } from '../controller/loginController.js';



// fetch order 
router.post('/',loginController)
// add user
router.post('/create',createUserController)

// farmer-login - send otp through mobile app
router.post('/send-otp',sendOtpController)
// verify-otp
router.post('/verify-otp',verifyOtpController)

// fetch total no. of order
// router.get('/fetch-total-count',requireSignin,totalOrderCountController)
// // fetch single order
// router.get('/fetch-order/:id',requireSignin,fetchSingleOrderController)
// // add order
// router.post('/add',requireSignin,addNewOrderController)
// // update order
// router.put('/update/:id',requireSignin,updateOrderController)
// // delete order
// router.delete('/delete/:id',requireSignin,deleteOrderController)





export default router;