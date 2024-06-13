import { errorResponse } from "../config/errorResponse.js";
import { addNewAttributeModel, deleteAttributeModel, fetchAllAttributeModel, fetchSingleAttributeModel, updateAttributeModel } from "../model/model.js";

export const fetchAllAttributeController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAllAttributeController",req.body);
        let result = await fetchAllAttributeModel(req.body);
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
        console.log("error occured in fetchAllAttributeController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const fetchSingleAttributeController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleAttributeController",req.body);
        let id = req.params.id;
        req.body.id = id;
        let result = await fetchSingleAttributeModel(req.body);
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
        console.log("error occured in fetchSingleAttributeController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewAttributeController = async(req,res)=>{
    try {
        console.log("Request body received in addNewAttributeController --->",req.body);
        let response = await addNewAttributeModel(req.body);
        
        console.log("Add Attribute Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in addNewProductController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
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

export const updateAttributeController = async(req,res)=>{
    try {
        console.log("Request body received in updateAttributeController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await updateAttributeModel(req.body);
        
        console.log("Update Attribute Response--->",response);
        if(response.success){
            console.log(`Attribute Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in updateAttributeController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateAttributeController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const deleteAttributeController = async(req,res)=>{
    try {
        console.log("Request body received in deleteAttributeController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await deleteAttributeModel(req.body);
        
        console.log("Delete Attribute Response--->",response);
        if(response.success){
            console.log(`Attribute Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteAttributeController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateAttributeController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}