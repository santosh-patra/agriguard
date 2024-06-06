import { errorResponse } from "../config/errorResponse.js";
import connection from "../config/mysqlconfig.js";
import Category from "../schema/categorySchema.js";
import Product from "../schema/productSchema.js";



// product model
export const fetchAllProductModel = async (fields) => {
    console.log("Data received in fetchAllProductModel --->", fields);

    try {
        let fetchProductSql = 'Select * from orders;'
        let result = await connection.query(fetchProductSql);
        console.log("djcvhvaudiv=--->", result.length)
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

export const addNewProductModel = async (fields) => {
    console.log("Data received in fetchAllProductModel --->", fields);

    try {
        let addProductSql = `INSERT INTO products (product_name,short_description,long_description,regular_price,sale_price,sku_code,stock_status,stock_qty,tax_category,delivery_charges,prod_attribute,product_single_image,product_multiple_image)
        VALUES ('${fields.product_name}', '${fields.short_description}', '${fields.long_description}', '${fields.regular_price}','${fields.sale_price}','${fields.sku_code}','${fields.stock_status}','${fields.stock_qty}','${fields.tax_category}','${fields.delivery_charges}','${fields.prod_attribute}','${fields.product_single_image}','${fields.product_multiple_image}');`;
        console.log("Add Product SQL Query--->", addProductSql);

        let result = await connection.query(addProductSql);
        return ({
            success: true,
            message: "A New Product has been created Successfully",
            data: result
        })

    } catch (error) {
        console.log("error occured in addNewProduct Model--->", error)
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
        let fetchAllFarmerSql = 'Select count(*) as total_farmer from farmers;'
        let result = await connection.query(fetchAllFarmerSql);

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


// order
export const fetchAllOrderModel = async (fields) => {
    console.log("Data received in fetchAllOrderModel --->", fields);

    try {
        let fetchAllOrderSql = 'Select * from orders;'
        let result = await connection.query(fetchAllOrderSql);
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

export const fetchSingleOrderModel = async (fields) => {
    console.log("Data received in fetchSingleOrderModel --->", fields);
    try {
        let fetchSingleOrderSql = `Select * from orders where id=${fields.id};`
        let result = await connection.query(fetchSingleOrderSql);
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
        let addOrderSql = `INSERT INTO orders (name,qty,price,order_status,date_of_order,payment_status)
        VALUES ('${fields.name}','${fields.qty}', '${fields.price}', '${fields.order_status}','${fields.date_of_order}','${fields.payment_status}');`;
        console.log("Add Order SQL Query--->", addOrderSql);
        let result = await connection.query(addOrderSql);
        if(result.affectedRows == 1){
            let fetchSql = `Select * from orders where id=${result.insertId};`;
            let fetchSqlResp = await connection.query(fetchSql);
            return ({
                success: true,
                message: "A New Order has been generated",
                data: fetchSqlResp
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


export const deleteOrderModel = async (fields) => {
    try {
        // check the order is exist or not
        console.log("Data received in deleteOrderModel --->", fields);
        let existingOrderSql = `Select * from orders where id=${fields.id}`;
        let existingOrderResp = await connection.query(existingOrderSql);
        console.log("existingOrderResp--->", existingOrderResp)
        if (existingOrderResp.length == 0) {
            return ({
                success: false,
                message: "Order I'd is not present... Please provide valid Order I'd"
            })
        }

        let deleteOrderSql = `Delete FROM orders WHERE id = ${fields.id};`;
        console.log("Delete Order SQL Query--->", deleteOrderSql);
        let result = await connection.query(deleteOrderSql);
        console.log("Delete Category Response--->", result)
        if (result.affectedRows == 1) {
            return ({
                success: true,
                message: "Order Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
                error: errorResponse(1, 'Unable to delete Order Details', result)
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
        // check the ctageory is exist or not
        console.log("Data received in updateCategoryModel --->", fields);
        let existingCategorySql = `Select * from categories where id=${fields.id}`;
        let existingCategoryResp = await connection.query(existingCategorySql);
        console.log("existingCategoryResp--->", existingCategoryResp)
        if (existingCategoryResp.length == 0) {
            return ({
                success: false,
                message: "Category I'd is not present... Please provide valid Category I'd"
            })
        }

        let updateCategorySql = `UPDATE categories SET name = '${fields.name}' WHERE id = ${fields.id};`;
        console.log("Update category SQL Query--->", updateCategorySql);
        let result = await connection.query(updateCategorySql);
        if (result.affectedRows == 1) {
            let existingCategoryResp1 = await connection.query(existingCategorySql);
            return ({
                success: true,
                message: "Category updated Successfully",
                data: existingCategoryResp1
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
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
        console.log("Data received in deleteCategoryModel --->", fields);
        let existingCategorySql = `Select * from categories where id=${fields.id}`;
        let existingCategoryResp = await connection.query(existingCategorySql);
        console.log("existingCategoryResp--->", existingCategoryResp)
        if (existingCategoryResp.length == 0) {
            return ({
                success: false,
                message: "Category I'd is not present... Please provide valid Category I'd"
            })
        }

        let deleteCategorySql = `Delete FROM categories WHERE id = ${fields.id};`;
        console.log("Update category SQL Query--->", deleteCategorySql);
        let result = await connection.query(deleteCategorySql);
        console.log("Delete Category Response--->", result)
        if (result.affectedRows == 1) {
            return ({
                success: true,
                message: "Category Deleted Successfully",
                data: []
            })
        }
        else {
            return ({
                success: false,
                message: "Something Went Wrong...Please try again",
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


