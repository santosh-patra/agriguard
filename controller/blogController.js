import { errorResponse } from "../config/errorResponse.js";
import { addNewBlogModel, deleteBlogModel, fetchAllBlogModel, fetchSingleBlogModel, updateBlogModel } from "../model/model.js";

export const fetchAllBlogController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAllBlogController",req.body);
        let result = await fetchAllBlogModel(req.body);
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
        console.log("error occured in fetchAllBlogController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const fetchSingleBlogController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleBlogController",req.body);
        let id = req.params.id;
        req.body.id = id;
        let result = await fetchSingleBlogModel(req.body);
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
        console.log("error occured in fetchSingleBlogController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewBlogController = async(req,res)=>{
    try {
        console.log("Request body received in addNewBlogController --->",req.body);
        let response = await addNewBlogModel(req.body);
        
        console.log("Add Blog Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in addNewBlogController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewBlogController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateBlogController = async(req,res)=>{
    try {
        console.log("Request body received in updateBlogController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await updateBlogModel(req.body);
        
        console.log("Update Blog Response--->",response);
        if(response.success){
            console.log(`Blog Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some DB Error occured in updateBlogController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateBlogController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const deleteBlogController = async(req,res)=>{
    try {
        console.log("Request body received in deleteBlogController --->",req.body);
        let id = req.params.id;
        req.body.id = id
        let response = await deleteBlogModel(req.body);
        
        console.log("Delete Blog Response--->",response);
        if(response.success){
            console.log(`Blog Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteBlogController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateBlogController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}