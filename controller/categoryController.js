import { errorResponse } from "../config/errorResponse.js";
import { addNewCategoryModel, deleteCategoryModel, fetchAllCategoryModel, fetchSingleCategoryModel, updateCategoryModel } from "../model/model.js";

export const fetchAllCategoryController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAllCategoryController",req.body);
        let result = await fetchAllCategoryModel(req.body);
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
        console.log("error occured in fetchAllCategoryController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const fetchSingleCategoryController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleCategoryController",req.body);
        let id = req.params.id;
        req.body.id = id;
        let result = await fetchSingleCategoryModel(req.body);
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
        console.log("error occured in fetchSingleCategoryController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewCategoryController = async(req,res)=>{
    try {
        console.log("Request body received in addNewCategoryController --->",req.body);
        let response = await addNewCategoryModel(req.body);
        
        console.log("Add Category Response--->",response);
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

export const updateCategoryController = async(req,res)=>{
    try {
        console.log("Request body received in updateCategoryController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await updateCategoryModel(req.body);
        
        console.log("Update Category Response--->",response);
        if(response.success){
            console.log(`Category Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in updateCategoryController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateCategoryController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const deleteCategoryController = async(req,res)=>{
    try {
        console.log("Request body received in deleteCategoryController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await deleteCategoryModel(req.body);
        
        console.log("Delete Category Response--->",response);
        if(response.success){
            console.log(`Category Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteCategoryController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateCategoryController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}