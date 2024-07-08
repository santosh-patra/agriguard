import { Op, Sequelize } from "sequelize";
import { errorResponse } from "../config/errorResponse.js";
import Category from "../schema/categorySchema.js";
import Farmer from "../schema/farmerSchema.js";
import Orders from "../schema/orderSchema.js";
import Product from "../schema/productSchema.js";
import User from "../schema/loginSchema.js";
import Attribute from "../schema/attributeSchema.js";
import SoilTest from "../schema/soilTestSchema.js";
import CropName from "../schema/cropNameSchema.js";
import CarbonCredit from "../schema/carbonCreditSchema.js";
import Blog from "../schema/blogSchema.js";



// user model
export const loginModel = async (fields) => {
    console.log("Data received in loginModel --->", fields);
    try {
        let result = await User.findOne({ where: { email_id:fields.email_id } });
        console.log("Fetch Single user result--->",result);
        if (result) {
            if(result.dataValues.password != fields.password){
                return ({
                    success: false,
                    message: "Invalid Password... Please try again",
                    error: []
                }) 
            }
            return ({
                success: true,
                message: "User Details fetch Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in loginModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const sendOtpModel = async(fields)=>{
    console.log("Data received in sendOtpModel --->", fields);
    try {
        let result = await Farmer.findOne({ where: { mobile_no:fields.mobile_no } });
        console.log("Fetch farmer for OTP result--->",result);
        if (result) {
            return ({
                success: true,
                message: "Farmer details Available...Please proceed for send otp",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Farmer is not registered with us. Please signup to proceed",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in sendOtpModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const createUserModel = async (fields) => {
    console.log("Data received in createUserModel --->", fields);

    try {
        let existingUser = await User.findOne({where:{email_id:fields.email_id}})
        if(existingUser){
            return ({
                success: false,
                message: "Email id is already Present... Please try with different Email..",
                error: errorResponse(1, 'Unable to Add User Details', {})
            })
        }

        let result = await User.create(fields);
        console.log("create user result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New User has been added",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add User Details', result)
            })
        }
    } catch (error) {
        console.log("error occured in createUserModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}




// product model
export const fetchAllProductModel = async (fields) => {
    console.log("Data received in fetchAllProductModel --->", fields);

    try {
        const result = await Product.findAll(
        //     {
        //     attributes: { exclude: ['product_single_image','product_multiple_image'] }
        //   }
        );
        let allProduct = []
        if (result.length > 0) {
            result.forEach(res=>{
                if(res.dataValues.long_description){
                    res.dataValues.long_description = JSON.parse(res.dataValues.long_description);
                }
                if(res.dataValues.prod_attribute){
                    res.dataValues.prod_attribute = JSON.parse(res.dataValues.prod_attribute);
                }
                if(res.dataValues.product_multiple_image){
                    res.dataValues.product_multiple_image = JSON.parse(res.dataValues.product_multiple_image);
                }
                allProduct.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Product Fetch successfully",
                data: allProduct
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }
    } catch (error) {
        console.log("error occured in fetchAllProduct Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleProductModel = async (fields) => {
    console.log("Data received in fetchSingleProductModel --->", fields);
    try {
        let result = await Product.findOne({ where: { id:fields.id } });
        console.log("Fetch Single product result--->",result);
        if (result) {
            if(result.dataValues.long_description){
                result.dataValues.long_description = JSON.parse(result.dataValues.long_description);
            }
            if(result.dataValues.prod_attribute){
                result.dataValues.prod_attribute = JSON.parse(result.dataValues.prod_attribute);
            }
            if(result.dataValues.product_multiple_image){
                result.dataValues.product_multiple_image = JSON.parse(result.dataValues.product_multiple_image);
            }
            return ({
                success: true,
                message: "Order Details fetch Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchSingleProductModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchProductImageModel = async (fields) => {
    console.log("Data received in fetchProductImageModel --->", fields);

    try {
        // let fetchProductSql = 'Select * from orders;'
        // let result = await connection.query(fetchProductSql);
        // console.log("djcvhvaudiv=--->", result.length)
        const result = await Product.findByPk(fields.id,{
            attributes: ['product_single_image','product_multiple_image']
          });
        if (result) {
            if(result.dataValues.product_multiple_image){
                let value = JSON.parse(result.dataValues.product_multiple_image);
                result.dataValues.product_multiple_image = value;
            }
            return ({
                success: true,
                message: "Product Fetch successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }
    } catch (error) {
        console.log("error occured in fetchProductImageModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewProductModel = async (fields) => {
    console.log("Data received in fetchAllProductModel --->", fields);

    try {
        // let addProductSql = `INSERT INTO products (product_name,short_description,long_description,regular_price,sale_price,sku_code,stock_status,stock_qty,tax_category,delivery_charges,prod_attribute,product_single_image,product_multiple_image)
        // VALUES ('${fields.product_name}', '${fields.short_description}', '${fields.long_description}', '${fields.regular_price}','${fields.sale_price}','${fields.sku_code}','${fields.stock_status}','${fields.stock_qty}','${fields.tax_category}','${fields.delivery_charges}','${fields.prod_attribute}','${fields.product_single_image}','${fields.product_multiple_image}');`;
        // console.log("Add Product SQL Query--->", addProductSql);

        // let result = await connection.query(addProductSql);
        if(fields.product_multiple_image){
            let multiImageString = JSON.stringify(fields.product_multiple_image)
            fields.product_multiple_image = multiImageString;
        }
        if(fields.long_description){
            fields.long_description = JSON.stringify(fields.long_description);
        }
        if(fields.prod_attribute){
            fields.prod_attribute = JSON.stringify(fields.prod_attribute);
        }
        let result = await Product.create(fields);
        console.log("create Product result--->",result)
        if(result.uniqno == 1){
            if(result.dataValues.product_multiple_image){
                result.dataValues.product_multiple_image = JSON.parse(result.dataValues.product_multiple_image)
            } 
            if(result.dataValues.long_description){
                result.dataValues.long_description = JSON.parse(result.dataValues.long_description)
            } 
            if(result.dataValues.prod_attribute){
                result.dataValues.prod_attribute = JSON.parse(result.dataValues.prod_attribute)
            } 
            return ({
                success: true,
                message: "A New Product has been created Successfully",
                data: result.dataValues
            })
        }
        else{
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Product Details', result)
            })
        }
        

    } catch (error) {
        console.log("error occured in addNewProduct Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const totalProductCountModel = async(fields)=>{
    console.log("Data received in totalProductCountModel --->", fields);

    try {
        let result = await Product.count();
        //   console.log("Searching result--->",result)
        return ({
            success: true,
            message: "Total Count of Product ",
            data: result
        })
    } catch (error) {
        console.log("error occured in totalProductCountModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const searchProductModel = async (fields) => {
    console.log("Data received in searchProductModel --->", fields);

    try {
        let result = await Product.findAll({
            where: 
            {
                [Sequelize.Op.or]: [
                  {
                    product_name: {
                      [Sequelize.Op.like]: `%${fields.keyword}%`
                    }
                  },
                  {
                    short_description: {
                      [Sequelize.Op.like]: `%${fields.keyword}%`
                    }
                  },
                  {
                    long_description: {
                      [Sequelize.Op.like]: `%${fields.keyword}%`
                    }
                  }
                ]
              }
          });
        //   console.log("Searching result--->",result)
        if (result) {
            return ({
                success: true,
                message: "Product search successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }
    } catch (error) {
        console.log("error occured in searchProductModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateProductModel = async (fields) => {
    console.log("Data received in updateProductModel --->", fields);

    try {
        let existingProduct = await Product.findByPk(fields.id,{
            // attributes: { exclude: ['product_single_image','product_multiple_image'] }
        });
        if(existingProduct){
            console.log("existingProduct Result--->",existingProduct.dataValues)
            let updateObj = {};
            updateObj.product_name = fields.product_name ? fields.product_name : existingProduct.product_name
            updateObj.short_description = fields.short_description ? fields.short_description : existingProduct.short_description
            updateObj.long_description = fields.long_description ? JSON.stringify(fields.long_description) : existingProduct.long_description
            updateObj.regular_price = fields.regular_price ? fields.regular_price : existingProduct.regular_price
            updateObj.sale_price = fields.sale_price ? fields.sale_price : existingProduct.sale_price
            updateObj.sku_code = fields.sku_code ? fields.sku_code : existingProduct.sku_code
            updateObj.stock_status = fields.stock_status ? fields.stock_status : existingProduct.stock_status
            updateObj.stock_qty = fields.stock_qty ? fields.stock_qty : existingProduct.stock_qty
            updateObj.tax_category = fields.tax_category ? fields.tax_category : existingProduct.tax_category
            updateObj.delivery_charges = fields.delivery_charges ? fields.delivery_charges : existingProduct.delivery_charges
            updateObj.prod_attribute = fields.prod_attribute ? JSON.stringify(fields.prod_attribute) : existingProduct.prod_attribute
            updateObj.product_single_image = fields.product_single_image ? fields.product_single_image : existingProduct.product_single_image
            updateObj.product_multiple_image = fields.product_multiple_image ? JSON.stringify(fields.product_multiple_image) : existingProduct.product_multiple_image
            updateObj.CategoryId = fields.CategoryId ? fields.CategoryId : existingProduct.CategoryId
            
            let updateRes = await existingProduct.update(updateObj);
            // if(updateRes.dataValues.product_single_image){
            //     delete updateRes.dataValues.product_single_image;
            // }
            // if(updateRes.dataValues.product_multiple_image){
            //     delete updateRes.dataValues.product_single_image;
            // }
            if(updateRes.dataValues.product_multiple_image){
                updateRes.dataValues.product_multiple_image = JSON.parse(updateRes.dataValues.product_multiple_image)
            } 
            if(updateRes.dataValues.long_description){
                updateRes.dataValues.long_description = JSON.parse(updateRes.dataValues.long_description)
            } 
            if(updateRes.dataValues.prod_attribute){
                updateRes.dataValues.prod_attribute = JSON.parse(updateRes.dataValues.prod_attribute)
            } 
            return ({
                success: true,
                message: "Product updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Product Found",
                error: errorResponse(1, 'Unable to Update Product Details', existingProduct)
            })
        }
        

    } catch (error) {
        console.log("error occured in updateProductModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteProductModel = async (fields) => {
    try {
        // check the Product is exist or not
        let id = fields.id;
        const result = await Product.findByPk(id);
        console.log("Product Result--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Product Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Product Found",
                error: errorResponse(1, 'Unable to Delete product Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteCategoryModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}


// farmer model
export const fetchAllFarmerModel = async (fields) => {
    console.log("Data received in fetchAllFarmerModel --->", fields);

    try {
        // let fetchAllFarmerSql = 'Select count(*) as total_farmer from farmers;'
        // let result = await connection.query(fetchAllFarmerSql);
        let result = await Farmer.findAll();
        console.log("result--->",result)
        let allFarmer = []
        if(result){
            result.forEach(res=>{
                if(res.dataValues.address){
                    res.dataValues.address = JSON.parse(res.dataValues.address);
                }
                if(res.dataValues.crop_insured){
                    res.dataValues.crop_insured = JSON.parse(res.dataValues.crop_insured);
                }
                if(res.dataValues.farm_details){
                    res.dataValues.farm_details = JSON.parse(res.dataValues.farm_details);
                }
                allFarmer.push(res.dataValues)
            })
            
            return ({
                success: true,
                message: "Total No. Of farmer ",
                data: allFarmer
            })
        }
        else{
            return ({
                success: false,
                message: "No Farmer List found",
                data: result
            })
        }

    } catch (error) {
        console.log("error occured in fetchAllFarmerModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const totalFarmerCountModel = async(fields)=>{
    console.log("Data received in totalFarmerCountModel --->", fields);

    try {
        let result = await Farmer.count();
        //   console.log("Searching result--->",result)
        return ({
            success: true,
            message: "Total Count of Product ",
            data: result
        })
    } catch (error) {
        console.log("error occured in totalFarmerCountModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleFarmerModel = async (fields) => {
    console.log("Data received in fetchSingleFarmerModel --->", fields);
    try {
        let result = await Farmer.findOne({ where: { farmer_id:fields.id } });
        console.log("Fetch Single farmer result--->",result);
        if (result) {
            if(result.dataValues.address){
                result.dataValues.address = JSON.parse(result.dataValues.address);
            }
            if(result.dataValues.crop_insured){
                result.dataValues.crop_insured = JSON.parse(result.dataValues.crop_insured);
            }
            if(result.dataValues.farm_details){
                result.dataValues.farm_details = JSON.parse(result.dataValues.farm_details);
            }
            return ({
                success: true,
                message: "Farmer Details fetch Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchSingleFarmerModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewFarmerModel = async (fields) => {
    console.log("Data received in fetchAllFarmerModel --->", fields);

    try {
        let singleFarmerResult = await Farmer.findOne({ where: { mobile_no:fields.mobile_no } });
        if(singleFarmerResult){
            return ({
                success: false,
                message: "Farmer Mobile no. is already registered... Please Login or add another number",
                error: errorResponse(1, 'Unable to Add Farmer Details', {})
            })
        }
        if(fields.address){
            let address = JSON.stringify(fields.address)
            fields.address = address;
        }
        if(fields.crop_insured){
            let crop_insured = JSON.stringify(fields.crop_insured)
            fields.crop_insured = crop_insured;
        }
        if(fields.farm_details){
            let farm_details = JSON.stringify(fields.farm_details)
            fields.farm_details = farm_details;
        }
        let result = await Farmer.create(fields);
        console.log("create Farmer result--->",result)
        if(result.uniqno == 1){
            if(result.dataValues.address){
                let address = JSON.parse(result.dataValues.address)
                result.dataValues.address = address;
            }
            if(result.dataValues.crop_insured){
                let crop_insured = JSON.parse(result.dataValues.crop_insured)
                result.dataValues.crop_insured = crop_insured;
            }
            if(result.dataValues.farm_details){
                let farm_details = JSON.parse(result.dataValues.farm_details)
                result.dataValues.farm_details = farm_details;
            }
            return ({
                success: true,
                message: "A New Farmer has been created Successfully",
                data: result.dataValues
            })
        }
        else{
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Farmer Details', result)
            })
        }
        

    } catch (error) {
        console.log("error occured in addNewFarmer Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateFarmerModel = async (fields) => {
    console.log("Data received in updateFarmerModel --->", fields);

    try {
        let existingFarmer = await Farmer.findOne({ where: { farmer_id:fields.id } });
        console.log("existingFarmer Result--->",existingFarmer)
        if(existingFarmer){
            let updateObj = {};
            updateObj.first_name = fields.first_name ? fields.first_name : existingFarmer.first_name
            updateObj.last_name = fields.last_name ? fields.last_name : existingFarmer.last_name
            updateObj.middle_name = fields.middle_name ? fields.middle_name : existingFarmer.middle_name
            updateObj.mobile_no = fields.mobile_no ? fields.mobile_no : existingFarmer.mobile_no
            updateObj.email_id = fields.email_id ? fields.email_id : existingFarmer.email_id
            updateObj.photo = fields.photo ? JSON.stringify(fields.photo) : existingFarmer.photo
            updateObj.age = fields.age ? fields.age : existingFarmer.age
            updateObj.gender = fields.gender ? fields.gender : existingFarmer.gender
            updateObj.address = fields.address ? JSON.stringify(fields.address) : existingFarmer.address
            updateObj.crop_insured = fields.crop_insured ? JSON.stringify(fields.crop_insured) : existingFarmer.crop_insured
            updateObj.farm_details = fields.farm_details ? JSON.stringify(fields.farm_details) : existingFarmer.farm_details
            
            let updateRes = await existingFarmer.update(updateObj);
            if(updateRes.dataValues.address){
                updateRes.dataValues.address = JSON.parse(updateRes.dataValues.address)
            }
            if(updateRes.dataValues.crop_insured){
                updateRes.dataValues.crop_insured = JSON.parse(updateRes.dataValues.crop_insured)
            }
            if(updateRes.dataValues.farm_details){
                updateRes.dataValues.farm_details = JSON.parse(updateRes.dataValues.farm_details)
            }
            return ({
                success: true,
                message: "Farmer updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Farmer Found",
                error: errorResponse(1, 'Unable to Update Farmer Details', existingFarmer)
            })
        }
        

    } catch (error) {
        console.log("error occured in updateFarmerModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteFarmerModel = async (fields) => {
    try {
        // check the Farmer is exist or not
        let id = fields.id;
        const result = await Farmer.findOne({ where: { farmer_id:fields.id } });
        console.log("Farmer Result--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Farmer Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Farmer Found",
                error: errorResponse(1, 'Unable to Delete farmer Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteCategoryModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}


// order
export const fetchAllOrderModel = async (fields) => {
    console.log("Data received in fetchAllOrderModel --->", fields);

    try {
        let result = await Orders.findAll();
        let allOrder = []
        if (result.length > 0) {
            result.forEach(res=>{
                if(res.dataValues.address){
                    res.dataValues.address = JSON.parse(res.dataValues.address);
                }
                allOrder.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Order Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllFarmerModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const totalOrderCountModel = async(fields)=>{
    console.log("Data received in totalOrderCountModel --->", fields);

    try {
        let result = await Orders.count();
        //   console.log("Searching result--->",result)
        return ({
            success: true,
            message: "Total Count of Order ",
            data: result
        })
    } catch (error) {
        console.log("error occured in totalOrderCountModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleOrderModel = async (fields) => {
    console.log("Data received in fetchSingleOrderModel --->", fields);
    try {
        let result = await Orders.findOne({ where: { order_id:fields.order_id } });
        console.log("Fetch Single ctagory result--->",result);
        if (result) {
            if(result.dataValues.address){
                let address = JSON.parse(result.dataValues.address)
                result.dataValues.address = address;
            }
            return ({
                success: true,
                message: "Order Details fetch Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchSingleOrderModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewOrderModel = async (fields) => {
    console.log("Data received in addNewOrderModel --->", fields);

    try {
        // let addOrderSql = `INSERT INTO orders (name,qty,price,order_status,date_of_order,payment_status)
        // VALUES ('${fields.name}','${fields.qty}', '${fields.price}', '${fields.order_status}','${fields.date_of_order}','${fields.payment_status}');`;
        // console.log("Add Order SQL Query--->", addOrderSql);
        // let result = await connection.query(addOrderSql);
        if(fields.address){
            let address = JSON.stringify(fields.address)
            fields.address = address;
        }
        let result = await Orders.create(fields);
        console.log("create Orders result--->",result)
        if(result.uniqno == 1){
            if(result.dataValues.address){
                let address = JSON.parse(result.dataValues.address)
                result.dataValues.address = address;
            }
            return ({
                success: true,
                message: "A New Order has been generated",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to create order Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in addNeworder Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateOrderModel = async (fields) => {
    console.log("Data received in updateOrderModel --->", fields);

    try {
        let existingOrder = await Orders.findOne({ where: { order_id:fields.order_id } });
        console.log("existingOrder Result--->",existingOrder)
        if(existingOrder){
            let updateObj = {};
            updateObj.farmer_id = fields.farmer_id ? fields.farmer_id : existingOrder.farmer_id
            updateObj.farmer_name = fields.farmer_name ? fields.farmer_name : existingOrder.farmer_name
            updateObj.category_id = fields.category_id ? fields.category_id : existingOrder.category_id
            updateObj.product_id = fields.product_id ? fields.product_id : existingOrder.product_id
            updateObj.product_name = fields.product_name ? fields.product_name : existingOrder.product_name
            updateObj.qty = fields.qty ? fields.qty : existingOrder.qty
            updateObj.address = fields.address ? JSON.stringify(fields.address) : existingOrder.address
            updateObj.attribute = fields.attribute ? fields.attribute : existingOrder.attribute
            updateObj.price = fields.price ? fields.price : existingOrder.price
            updateObj.order_status = fields.order_status ? fields.order_status : existingOrder.order_status
            updateObj.date_of_order = fields.date_of_order ? fields.date_of_order : existingOrder.date_of_order
            updateObj.payment_status = fields.payment_status ? fields.payment_status : existingOrder.payment_status
            updateObj.decline_reason = fields.decline_reason ? fields.decline_reason : existingOrder.decline_reason
            
            let updateRes = await existingOrder.update(updateObj);
            if(updateRes.dataValues.address){
                let address = JSON.parse(updateRes.dataValues.address)
                updateRes.dataValues.address = address;
            }
            return ({
                success: true,
                message: "Order updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Order Found",
                error: errorResponse(1, 'Unable to Update Order Details', existingOrder)
            })
        }
        

    } catch (error) {
        console.log("error occured in updateOrderModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteOrderModel = async (fields) => {
    try {
        // check the order is exist or not
        
        let result = await Orders.findOne({ where: { order_id:fields.order_id } });
        console.log("resultresultresult--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Orders Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Order Found",
                error: []
            })
        }

    } catch (error) {
        console.log("error occured in deleteOrderModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchOrderModel = async (fields) => {
    console.log("Data received in fetchOrderModel --->", fields);
    try {
        let result = await Orders.findAll({ where: { farmer_id:fields.farmer_id } });
        console.log("Fetch Single farmer order result--->",result);
        if (result) {
            return ({
                success: true,
                message: "Order Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchOrderModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchOrderReportModel = async (fields) => {
    console.log("Data received in fetchOrderReportModel --->", fields);
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        let startDate = fields.startDate ? new Date(fields.startDate) : new Date(`${year}-${month}-${date}`);
        startDate.setHours(0, 0, 0, 0);
        let endDate = fields.endDate ? new Date(fields.endDate) : new Date(`${year}-${month}-${date}`);
        endDate.setHours(23, 59, 59, 999);
        let result = await Orders.findAll({
            where: {
              createdAt: {
                [Op.between]: [`${startDate}`, `${endDate}`]
              }
            }
          });
        console.log("fetch Order Report result--->",result);
        let allOrder = [];
        if (result) {
            result.forEach(res=>{
                if(res.dataValues.address){
                    res.dataValues.address = JSON.parse(res.dataValues.address);
                }
                allOrder.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Order Report Fetch Successfully",
                data: allOrder
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: allOrder
            })
        }
    } catch (error) {
        console.log("error occured in fetchOrderReportModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// category
export const fetchAllCategoryModel = async (fields) => {
    console.log("Data received in fetchAllCategoryModel --->", fields);
    try {
        let result = await Category.findAll();
        if (result.length > 0) {
            return ({
                success: true,
                message: "Categories Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllCategoriesModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleCategoryModel = async (fields) => {
    console.log("Data received in fetchSingleCategoryModel --->", fields);
    try {
        // let fetchSingleCategorySql = `Select * from categories where id=${fields.id};`
        let result = await Category.findOne({ where: { id:fields.id } });
        console.log("Fetch Single ctagory result--->",result);
        if (result) {
            return ({
                success: true,
                message: "Categories Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllCategoriesModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewCategoryModel = async (fields) => {
    console.log("Data received in addNewCategoryModel --->", fields);

    try {
        let result = await Category.create(fields);
        console.log("create category result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New Category has been created Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Category Details', result)
            })
        }
    } catch (error) {
        console.log("error occured in addNewProduct Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateCategoryModel = async (fields) => {
    try {
        let id = fields.id;
        const result = await Category.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let updateRes = await result.update({name:fields.name})

            return ({
                success: true,
                message: "Category updated Successfully",
                data: updateRes
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Category Found",
                error: errorResponse(1, 'Unable to Update Category Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in addNewProduct Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteCategoryModel = async (fields) => {
    try {
        // check the ctageory is exist or not
        let id = fields.id;
        const result = await Category.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Category Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Category Found",
                error: errorResponse(1, 'Unable to delete Category Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteCategoryModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}


// attribute
export const fetchAllAttributeModel = async (fields) => {
    console.log("Data received in fetchAllAttributeModel --->", fields);
    try {
        let result = await Attribute.findAll();
        if (result.length > 0) {
            return ({
                success: true,
                message: "Attributes Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllCategoriesModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleAttributeModel = async (fields) => {
    console.log("Data received in fetchSingleAttributeModel --->", fields);
    try {
        // let fetchSingleAttributeSql = `Select * from categories where id=${fields.id};`
        let result = await Attribute.findOne({ where: { id:fields.id } });
        console.log("Fetch Single Attributes result--->",result);
        if (result) {
            return ({
                success: true,
                message: "Attributes Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllAttributesModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewAttributeModel = async (fields) => {
    console.log("Data received in addNewAttributeModel --->", fields);

    try {
        let result = await Attribute.create(fields);
        console.log("create Attribute result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New Attribute has been created Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Attributes Details', result)
            })
        }
    } catch (error) {
        console.log("error occured in addNewAttribute Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateAttributeModel = async (fields) => {
    try {
        let id = fields.id;
        const result = await Attribute.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let updateRes = await result.update({
                name:fields.name ? fields.name : result.dataValues.name, 
                value:fields.value ? fields.value : result.dataValues.value,
                regular_price:fields.regular_price ? fields.regular_price : result.dataValues.regular_price,
                sale_price:fields.sale_price ? fields.sale_price : result.dataValues.sale_price
            })

            return ({
                success: true,
                message: "Attribute updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Attribute Found",
                error: errorResponse(1, 'Unable to Update Attribute Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in updateAttribute Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteAttributeModel = async (fields) => {
    try {
        // check the ctageory is exist or not
        let id = fields.id;
        const result = await Attribute.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Attribute Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Attribute Found",
                error: errorResponse(1, 'Unable to delete Attribute Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteAttributeModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// soil Test
export const createSoilTestModel = async (fields) => {
    console.log("Data received in createSoilTestModel --->", fields);

    try {
        let result = await SoilTest.create(fields);
        console.log("create SoilTest result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "Soil Health Test Record Created Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Attributes Details', result)
            })
        }
    } catch (error) {
        console.log("error occured in createSoilTestModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchAllSoilTestModel = async (fields) => {
    console.log("Data received in fetchAllSoilTestModel --->", fields);
    try {
        let result = await SoilTest.findAll();
        if (result.length > 0) {
            return ({
                success: true,
                message: "Soil Test Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllSoilTestModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleSoilTestModel = async (fields) => {
    console.log("Data received in fetchSingleSoilTestModel --->", fields);
    try {
        let result = await SoilTest.findAll({ where: { farmer_id:fields.id } });
        console.log("Fetch Single soilTest result by fsrmer Id--->",result);
        if (result) {
            return ({
                success: true,
                message: "Soil Test Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchSingleSoilTestModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}


export const updateSoilTestModel = async (fields) => {
    console.log("Data received in updateSoilTestModel --->", fields);

    try {
        let id = fields.id;
        const result = await SoilTest.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let updateRes = await result.update({
                first_name:fields.first_name ? fields.first_name : result.dataValues.first_name, 
                farmer_id:fields.farmer_id ? fields.farmer_id : result.dataValues.farmer_id, 
                last_name:fields.last_name ? fields.last_name : result.dataValues.last_name, 
                address:fields.address ? fields.address : result.dataValues.address,
                pincode:fields.pincode ? fields.pincode : result.dataValues.pincode,
                district:fields.district ? fields.district : result.dataValues.district,
                mobile_no:fields.mobile_no ? fields.mobile_no : result.dataValues.mobile_no,
                land_size:fields.land_size ? fields.land_size : result.dataValues.land_size,
                land_type:fields.land_type ? fields.land_type : result.dataValues.land_type,
                soil_type:fields.soil_type ? fields.soil_type : result.dataValues.soil_type,
                crop_name:fields.crop_name ? fields.crop_name : result.dataValues.crop_name,
                testing_status:fields.testing_status ? fields.testing_status : result.dataValues.testing_status,
            })

            return ({
                success: true,
                message: "Soil Test Record updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Soil Test Record Found",
                error: errorResponse(1, 'Unable to Update Soil Test Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in updateSoilTestModel Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteSoilTestModel = async (fields) => {
    console.log("Data received in deleteSoilTestModel --->", fields);

    try {
        // check the record is exist or not
        let id = fields.id;
        const result = await SoilTest.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Soil Test Record Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Record Found",
                error: errorResponse(1, 'Unable to delete Soil Test Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteSoilTestModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}
// crop name
export const fetchAllCropNameModel = async (fields) => {
    console.log("Data received in fetchAllCropNameModel --->", fields);
    try {
        let result = await CropName.findAll();
        if (result.length > 0) {
            return ({
                success: true,
                message: "CropName Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllCropNameModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleCropNameModel = async (fields) => {
    console.log("Data received in fetchSingleCropNameModel --->", fields);
    try {
        let result = await CropName.findOne({ where: { id:fields.id } });
        console.log("Fetch Single CropName result--->",result);
        if (result) {
            return ({
                success: true,
                message: "CropName Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchSingleCropNameModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewCropNameModel = async (fields) => {
    console.log("Data received in addNewCropNameModel --->", fields);

    try {
        let result = await CropName.create(fields);
        console.log("create CropName result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New CropName has been created Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add CropName Details', result)
            })
        }
    } catch (error) {
        console.log("error occured in addNewCropNameModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateCropNameModel = async (fields) => {
    try {
        let id = fields.id;
        const result = await CropName.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let updateRes = await result.update({name:fields.name})

            return ({
                success: true,
                message: "CropName updated Successfully",
                data: updateRes
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Record Found",
                error: errorResponse(1, 'Unable to Update CropName Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in updateCropNameModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteCropNameModel = async (fields) => {
    try {
        // check the ctageory is exist or not
        let id = fields.id;
        const result = await CropName.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "CropName Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Record Found",
                error: errorResponse(1, 'Unable to delete Record Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteCropNameModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// carbon credit
export const createCarbonCreditModel = async (fields) => {
    console.log("Data received in createCarbonCreditModel --->", fields);

    try {
        let result = await CarbonCredit.create(fields);
        console.log("create carbon credit result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New Carbon Credit has been created Successfully",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add carbon credit Details', result)
            })
        }
    } catch (error) {
        console.log("error occured in createCarbonCreditModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchCarbonCreditModel = async (fields) => {
    console.log("Data received in fetchCarbonCreditModel --->", fields);
    try {
        let result = await CarbonCredit.findAll();
        if (result.length > 0) {
            return ({
                success: true,
                message: "Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchCarbonCreditModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

// blog
export const fetchAllBlogModel = async (fields) => {
    console.log("Data received in fetchAllBlogModel --->", fields);
    try {
        let result = await Blog.findAll();
        let allBlogs = []
        if (result.length > 0) {
            result.forEach(res=>{
                if(res.dataValues.tags){
                    res.dataValues.tags = JSON.parse(res.dataValues.tags);
                }
                allBlogs.push(res.dataValues)
            })
            return ({
                success: true,
                message: "Blogs Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllBlogModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const fetchSingleBlogModel = async (fields) => {
    console.log("Data received in fetchSingleBlogModel --->", fields);
    try {
        // let fetchSingleBlogSql = `Select * from categories where id=${fields.id};`
        let result = await Blog.findOne({ where: { id:fields.id } });
        console.log("Fetch Single Blogs result--->",result);
        if (result) {
            if(result.dataValues.tags){
                let tags = JSON.parse(result.dataValues.tags)
                result.dataValues.tags = tags;
            }
            return ({
                success: true,
                message: "Blogs Details fetch Successfully",
                data: result
            })
        }
        else {
            return ({
                success: false,
                message: "Fail ! No Record Found",
                error: result
            })
        }


    } catch (error) {
        console.log("error occured in fetchAllBlogsModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const addNewBlogModel = async (fields) => {
    console.log("Data received in addNewBlogModel --->", fields);

    try {
        if(fields.tags){
            let tags = JSON.stringify(fields.tags)
            fields.tags = tags;
        }
        let result = await Blog.create(fields);
        console.log("create Blog result--->",result)
        if(result.uniqno == 1){
            if(result.dataValues.tags){
                let tags = JSON.parse(result.dataValues.tags)
                result.dataValues.tags = tags;
            }
            return ({
                success: true,
                message: "A New Blog has been Added",
                data: result.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to Add Blogs Details', result)
            })
        }
    } catch (error) {
        console.log("error occured in addNewBlog Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const updateBlogModel = async (fields) => {
    try {
        let id = fields.id;
        const result = await Blog.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            if(fields.tags){
                let tags = JSON.stringify(fields.tags)
                fields.tags = tags;
            }
            let updateRes = await result.update({
                blog_title:fields.blog_title ? fields.blog_title : result.dataValues.blog_title, 
                blog_content:fields.blog_content ? fields.blog_content : result.dataValues.blog_content,
                blog_image:fields.blog_image ? fields.blog_image : result.dataValues.blog_image,
                video_url:fields.video_url ? fields.video_url : result.dataValues.video_url,
                video_thumbnail:fields.video_thumbnail ? fields.video_thumbnail : result.dataValues.video_thumbnail,
                category:fields.category ? fields.category : result.dataValues.category,
                tags:fields.tags ? fields.tags : result.dataValues.tags,
            })
            if(updateRes.dataValues.tags){
                let tags = JSON.parse(updateRes.dataValues.tags)
                updateRes.dataValues.tags = tags;
            }

            return ({
                success: true,
                message: "Blog updated Successfully",
                data: updateRes.dataValues
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Blog Found",
                error: errorResponse(1, 'Unable to Update Blog Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in updateBlog Model--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}

export const deleteBlogModel = async (fields) => {
    try {
        // check the ctageory is exist or not
        let id = fields.id;
        const result = await Blog.findByPk(id);
        console.log("resultresultresult--->",result)
        if(result){
            let deleteRes = await result.destroy();
            return ({
                success: true,
                message: "Blog Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Fail !! No Blog Found",
                error: errorResponse(1, 'Unable to delete Blog Details', result)
            })
        }

    } catch (error) {
        console.log("error occured in deleteBlogModel--->", error)
        return ({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }
}
