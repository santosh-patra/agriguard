import { addNewOrderModel, deleteOrderModel, fetchAllOrderModel, fetchSingleOrderModel } from "../model/model.js";

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

export const fetchSingleOrderController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleOrderController",req.body);
        let id = req.params.id;
        req.body.id = id;
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


export const deleteOrderController = async(req,res)=>{
    try {
        console.log("Request body received in deleteOrderController --->",req.body);
        let id = req.params.id;
        req.body.id = id
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