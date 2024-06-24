import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
const app = express();
import { fileURLToPath } from 'url';
import loginRoutes from '../routes/loginRoutes.js';
import productRoutes from '../routes/productroutes.js';
import farmerRoutes from '../routes/farmerRoutes.js'
import orderRoutes from '../routes/orderRoutes.js'
import categoryRoutes from '../routes/categoryRoutes.js'
import attributeRoutes from '../routes/attributeRoutes.js'
import soilTestRoutes from '../routes/soilTestRoutes.js'
import cropNameRoutes from '../routes/cropNameRoutes.js'
import othersRoutes from '../routes/carbonCreditRoutes.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import jwt from 'jsonwebtoken'
import sequelize from '../config/mysqlconfig.js';
const SECRET_KEY = 'my-high-level-secret-key';

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors())
// console.log("dhgcdhc--->",path.join(__dirname,'../controller/qr-images'));
// console.log("dhgcdhc--->",path.basename(__filename));
// login routes
app.use('/v1/signin', loginRoutes)
// product routes
app.use('/v1/product', productRoutes)
// farmer routes
app.use('/v1/farmer', farmerRoutes)
// order
app.use('/v1/order', orderRoutes)
// category
app.use('/v1/category', categoryRoutes)
// attribute
app.use('/v1/attribute', attributeRoutes)
// soil test
app.use('/v1/soil-test', soilTestRoutes)
// crop name
app.use('/v1/crop-name', cropNameRoutes)
// others routes
app.use('/v1/others', othersRoutes)


app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: "Success"
  })

})
// caution : All your data will be removed from database.Please hit this api carefully
app.post('/force-all-remove-data', (req, res) => {
  sequelize.sync({ force: true })
    .then(() => {
      console.log("All data are removed from Database");
      res.status(200).send({
        success: true,
        message: "All data are removed from Database...Please add new data to Proceed"
      })
    })
    .catch(err => console.log("Error in deleting all data from database--->", err));
})
// caution : All your schema will be modfied from database.Please hit this api carefully
app.post('/alter-table-cloumn', (req, res) => {
  sequelize.sync({ alter: true })
    .then(() => {
      console.log("All Table Schemas are altered");
      res.status(200).send({
        success: true,
        message: "All Table Schemas are altered"
      })
    })
    .catch(err => console.log("Error in deleting all data from database--->", err));
})

//jwt token creation
app.get('/token', (req, res) => {
  var token = jwt.sign({ foo: 'bar' }, SECRET_KEY);
  console.log("token--->", token)
  res.status(200).send({
    success: true,
    token
  })

})

app.use((req, res, next) => {
  console.log("Yoh have entered the wrong Url......Please Check and try with correct URL");
  const err = new Error("Not Found");
  err.status = 404;
  return res.status(err.status).json({
    success: false,
    message: "Oops!! It seems that the URL might be incorrect..Please Check the Method, Endpoint and try Again",
    data: {
      url: req.originalUrl
    }
  });
});




export default app;