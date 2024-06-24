import express from 'express';
const router = express.Router();
import { requireSignin } from '../middleware/middleware.js';
import { createCarbonCreditController, fetchCarbonCreditController } from '../controller/carbonCreditController.js';



// add carbon- credit
router.post('/carbon-credit',requireSignin,createCarbonCreditController)
// fetch carbon-crditr
router.get('/fetch-carbon-credit',requireSignin,fetchCarbonCreditController)





export default router;