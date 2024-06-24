import { errorResponse } from "../config/errorResponse.js";
import { addNewCropNameModel, deleteCropNameModel, fetchAllCropNameModel, fetchSingleCropNameModel, updateCropNameModel } from "../model/model.js";

export const fetchAllCropNameController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAllCropNameController",req.body);
        let result = await fetchAllCropNameModel(req.body);
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
        console.log("error occured in fetchAllCropNameController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const fetchSingleCropNameController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleCropNameController",req.body);
        let id = req.params.id;
        req.body.id = id;
        let result = await fetchSingleCropNameModel(req.body);
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
        console.log("error occured in fetchSingleCropNameController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewCropNameController = async(req,res)=>{
    try {
        console.log("Request body received in addNewCropNameController --->",req.body);
        let response = await addNewCropNameModel(req.body);
        
        console.log("Add CropName Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in addNewCropNameController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewCropNameController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateCropNameController = async(req,res)=>{
    try {
        console.log("Request body received in updateCropNameController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await updateCropNameModel(req.body);
        
        console.log("Update CropName Response--->",response);
        if(response.success){
            console.log(`CropName Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in updateCropNameController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateCropNameController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const deleteCropNameController = async(req,res)=>{
    try {
        console.log("Request body received in deleteCropNameController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await deleteCropNameModel(req.body);
        
        console.log("Delete CropName Response--->",response);
        if(response.success){
            console.log(`CropName Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteCropNameController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteCropNameController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}