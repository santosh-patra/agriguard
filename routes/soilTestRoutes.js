import express from 'express';
const router = express.Router();
import { requireSignin } from '../middleware/middleware.js';
import { addSoilTestController, deleteSoilTestController, fetchAllSoilTestController, fetchSingleSoilTesController, updateSoilTestController } from '../controller/soilTestController.js';




// add new
router.post('/add',requireSignin,addSoilTestController)
// fetch all soil test
router.get('/fetch-soil-test',requireSignin,fetchAllSoilTestController)
// fetch single soil test
router.get('/fetch-soil-test/:id',requireSignin,fetchSingleSoilTesController)

// update
router.put('/update/:id',requireSignin,updateSoilTestController)
// delete
router.delete('/delete/:id',requireSignin,deleteSoilTestController)



export default router;