import { errorResponse } from "../config/errorResponse.js";
import { addNewOrderModel, deleteOrderModel, fetchAllOrderModel, fetchOrderModel, fetchSingleOrderModel, totalOrderCountModel, updateOrderModel } from "../model/model.js";

export const fetchAllOrderController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAllOrderController",req.body);
        let result = await fetchAllOrderModel(req.body);
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
        console.log("error occured in fetchAllOrderController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    } 
}

export const totalOrderCountController = async(req,res)=>{
    try {
        console.log("Request body received in totalOrderCountController --->",req.body);
        let response = await totalOrderCountModel(req.body);
        
        console.log("Total Order Response--->",response);
        if(response.success){
            console.log(`Fetching total Order`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in totalOrderCountController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in totalOrderCountController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const fetchSingleOrderController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleOrderController",req.body);
        let id = req.params.order_id;
        req.body.order_id = id;
        let result = await fetchSingleOrderModel(req.body);
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
        console.log("error occured in fetchSingleOrderController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewOrderController = async(req,res)=>{
    try {
        console.log("Request body received in addNewOrderController --->",req.body);
        let order_id = `AGR${Date.now()}${Math.floor(Math.random() * 10)}`;
        req.body.order_id = order_id;
        let response = await addNewOrderModel(req.body);
        
        console.log("Add Order Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in addNewOrderController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewOrderController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateOrderController = async(req,res)=>{
    try {
        console.log("Request body received in updateOrderController --->",req.body);
        let id = req.params.order_id;
        req.body.order_id = id;
        let response = await updateOrderModel(req.body);
        
        console.log("Update Order Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateOrderController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateOrderController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}


export const deleteOrderController = async(req,res)=>{
    try {
        console.log("Request body received in deleteOrderController --->",req.body);
        let id = req.params.order_id;
        req.body.order_id = id
        let response = await deleteOrderModel(req.body);
        
        console.log("Delete Order Response--->",response);
        if(response.success){
            console.log(`Order Details Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteOrderController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteOrderController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const fetchOrderController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchOrderController",req.body);
        let id = req.params.id;
        req.body.farmer_id = id;
        let result = await fetchOrderModel(req.body);
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
        console.log("error occured in fetchOrderController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}
