import { errorResponse } from "../config/errorResponse.js";
import connection from "../config/mysqlconfig.js";
import { addNewProductModel, fetchAllProductModel } from "../model/model.js";

export const getTestController = async (req, res) => {
    try {
        console.log("Get test controller API Hit");
        const { name, price, description, category } = req.body;
        res.status(200).send({
            success: true,
            message: "Data Fetch Successfully",
        })
    } catch (error) {
        console.log("Error occured in testing Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
    // finally {
    //     try {
    //         await connection.close();
    //         console.log('Connection closed successfully.');
    //     } catch (err) {
    //         console.error('Error closing the connection: ' + err.stack);
    //     }
    // }
}

export const fetchProductController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchProductController",req.body);
        let result = await fetchAllProductModel(req.body);
        console.log("Result--->", result)
        if(result.success){
            res.status(200).send({
                success:true,
                message:result.message,
                data:result.data
            })
        }
        else{
            res.status(200).send({
                success:false,
                message:result.message,
                error:result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchProductController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewProductController = async(req,res)=>{
    try {
        console.log("Request body received in addNewProductController --->",req.body);
        let response = await addNewProductModel(req.body);
        
        console.log("Add Product Response--->",response);
        if(response.data.affectedRows == 1){
            console.log(`Product Added Successfully With insert id ${response.data.insertId}`)
            res.status(200).send({
                success:true,
                message:response.message
            })
        }
        else{
            console.log("Some DB Error occured in addNewProductController--->",result)
            res.status(200).send({
                success:false,
                message:"Something Went Wrong...Please try again",
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewProductController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}