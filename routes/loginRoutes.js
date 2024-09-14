import express from 'express';
const router = express.Router();
import { requireSignin } from '../middleware/middleware.js';
import { createUserController, fetchAllFpoController, fetchFarmerByFpoController, fetchSingleFpoController, loginController, sendOtpController, verifyOtpController } from '../controller/loginController.js';



// fetch order 
router.post('/',loginController)
// add user
router.post('/create',createUserController)

// farmer-login - send otp through mobile app
router.post('/send-otp',sendOtpController)
// verify-otp
router.post('/verify-otp',verifyOtpController)
// fpo fetch farmer details based on fpo code
router.get('/farmerfpo/:code',fetchFarmerByFpoController)
// fetch single fpo details
router.get('/fpo/:code',fetchSingleFpoController)
// fetch all fpo details
router.get('/all-fpo',fetchAllFpoController)



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