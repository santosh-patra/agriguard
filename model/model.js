import { Sequelize } from "sequelize";
import { errorResponse } from "../config/errorResponse.js";
import Category from "../schema/categorySchema.js";
import Farmer from "../schema/farmerSchema.js";
import Orders from "../schema/orderSchema.js";
import Product from "../schema/productSchema.js";
import User from "../schema/loginSchema.js";



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
        if (result.length > 0) {
            return ({
                success: true,
                message: "Product Fetch successfully",
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
            if(result.dataValues.product_single_image){
                delete result.dataValues.product_single_image;
            }
            if(result.dataValues.product_multiple_image){
                delete result.dataValues.product_single_image;
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
        let result = await Product.create(fields);
        console.log("create Product result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New Product has been created Successfully",
                data: result
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
            attributes: { exclude: ['product_single_image','product_multiple_image'] }
        });
        console.log("existingProduct Result--->",existingProduct.dataValues)
        if(existingProduct){
            let updateObj = {};
            updateObj.product_name = fields.product_name ? fields.product_name : existingProduct.product_name
            updateObj.short_description = fields.short_description ? fields.short_description : existingProduct.short_description
            updateObj.long_description = fields.long_description ? fields.long_description : existingProduct.long_description
            updateObj.regular_price = fields.regular_price ? fields.regular_price : existingProduct.regular_price
            updateObj.sale_price = fields.sale_price ? fields.sale_price : existingProduct.sale_price
            updateObj.sku_code = fields.sku_code ? fields.sku_code : existingProduct.sku_code
            updateObj.stock_status = fields.stock_status ? fields.stock_status : existingProduct.stock_status
            updateObj.stock_qty = fields.stock_qty ? fields.stock_qty : existingProduct.stock_qty
            updateObj.tax_category = fields.tax_category ? fields.tax_category : existingProduct.tax_category
            updateObj.delivery_charges = fields.delivery_charges ? fields.delivery_charges : existingProduct.delivery_charges
            updateObj.prod_attribute = fields.prod_attribute ? fields.prod_attribute : existingProduct.prod_attribute
            updateObj.product_single_image = fields.product_single_image ? fields.product_single_image : existingProduct.product_single_image
            updateObj.product_multiple_image = fields.product_multiple_image ? JSON.stringify(fields.product_multiple_image) : existingProduct.product_multiple_image
            updateObj.CategoryId = fields.CategoryId ? fields.CategoryId : existingProduct.CategoryId
            
            let updateRes = await existingProduct.update(updateObj);
            if(updateRes.dataValues.product_single_image){
                delete updateRes.dataValues.product_single_image;
            }
            if(updateRes.dataValues.product_multiple_image){
                delete updateRes.dataValues.product_single_image;
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

        return ({
            success: true,
            message: "Total No. Of farmer ",
            data: result
        })

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
        let result = await Farmer.findOne({ where: { id:fields.id } });
        console.log("Fetch Single farmer result--->",result);
        if (result) {
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
        let result = await Farmer.create(fields);
        console.log("create Farmer result--->",result)
        if(result.uniqno == 1){
            return ({
                success: true,
                message: "A New Farmer has been created Successfully",
                data: result
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
        let existingFarmer = await Farmer.findByPk(fields.id);
        console.log("existingFarmer Result--->",existingFarmer)
        if(existingFarmer){
            let updateObj = {};
            updateObj.farmer_id = fields.farmer_id ? fields.farmer_id : existingFarmer.farmer_id
            updateObj.first_name = fields.first_name ? fields.first_name : existingFarmer.first_name
            updateObj.last_name = fields.last_name ? fields.last_name : existingFarmer.last_name
            updateObj.middle_name = fields.middle_name ? fields.middle_name : existingFarmer.middle_name
            updateObj.mobile_no = fields.mobile_no ? fields.mobile_no : existingFarmer.mobile_no
            updateObj.email_id = fields.email_id ? fields.email_id : existingFarmer.email_id
            updateObj.photo = fields.photo ? fields.photo : existingFarmer.photo
            updateObj.age = fields.age ? fields.age : existingFarmer.age
            updateObj.gender = fields.gender ? fields.gender : existingFarmer.gender
            updateObj.address = fields.address ? fields.address : existingFarmer.address
            updateObj.crop_insured = fields.crop_insured ? fields.crop_insured : existingFarmer.crop_insured
            updateObj.farm_details = fields.farm_details ? fields.farm_details : existingFarmer.farm_details
            
            let updateRes = await existingFarmer.update(updateObj);
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
        const result = await Farmer.findByPk(id);
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
        // let fetchAllOrderSql = 'Select * from orders;'
        // let result = await connection.query(fetchAllOrderSql);
        let result = await Orders.findAll();
        if (result.length > 0) {
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
        // let fetchSingleOrderSql = `Select * from orders where id=${fields.id};`
        // let result = await connection.query(fetchSingleOrderSql);
        let result = await Orders.findOne({ where: { id:fields.id } });
        console.log("Fetch Single ctagory result--->",result);
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
        let result = await Orders.create(fields);
        console.log("create Orders result--->",result)
        if(result.uniqno == 1){
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
        let existingOrder = await Orders.findByPk(fields.id);
        console.log("existingOrder Result--->",existingOrder)
        if(existingOrder){
            let updateObj = {};
            updateObj.name = fields.name ? fields.name : existingOrder.name
            updateObj.qty = fields.qty ? fields.qty : existingOrder.qty
            updateObj.price = fields.price ? fields.price : existingOrder.price
            updateObj.order_status = fields.order_status ? fields.order_status : existingOrder.order_status
            updateObj.date_of_order = fields.date_of_order ? fields.date_of_order : existingOrder.date_of_order
            updateObj.payment_status = fields.payment_status ? fields.payment_status : existingOrder.payment_status
            
            let updateRes = await existingOrder.update(updateObj);
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
        
        let id = fields.id;
        let result = await Orders.findOne({ where: { id } });
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


