import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
import { fileURLToPath } from 'url';
import productRoutes from '../routes/productroutes.js';
import farmerRoutes from '../routes/farmerRoutes.js'
import orderRoutes from '../routes/orderRoutes.js'
import categoryRoutes from '../routes/categoryRoutes.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import jwt from 'jsonwebtoken'
const SECRET_KEY = 'my-high-level-secret-key';

app.use(express.json());
app.use(cors())
// console.log("dhgcdhc--->",path.join(__dirname,'../controller/qr-images'));
// console.log("dhgcdhc--->",path.basename(__filename));
// product routes
app.use('/v1/product',productRoutes)
// farmer routes
app.use('/v1/farmer',farmerRoutes)
// order
app.use('/v1/order',orderRoutes)
// category
app.use('/v1/category',categoryRoutes)

app.get('/',(req,res)=>{
    res.status(200).send({
        success:true,
        message:"Success"
    })

})

//jwt token creation
app.get('/token',(req,res)=>{
    var token = jwt.sign({ foo: 'bar' }, SECRET_KEY);
    console.log("token--->",token)
    res.status(200).send({
        success:true,
        token
    })

})




export default  app;