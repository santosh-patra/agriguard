import { errorResponse } from "../config/errorResponse.js";
import { createSoilTestModel, deleteSoilTestModel, fetchAllSoilTestModel, fetchSingleSoilTestModel, updateSoilTestModel } from "../model/model.js";

export const addSoilTestController = async(req,res)=>{
    try {
        console.log("Request body received in addSoilTestController --->",req.body);
        let response = await createSoilTestModel(req.body);
        
        console.log("Add SoilTest Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in addSoilTestController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addSoilTestController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const fetchSingleSoilTesController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleSoilTesController",req.body);
        let id = req.params.id;
        req.body.id = id;
        let result = await fetchSingleSoilTestModel(req.body);
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
        console.log("error occured in fetchSingleSoilTesController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const fetchAllSoilTestController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAllSoilTestController",req.body);
        let result = await fetchAllSoilTestModel(req.body);
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
        console.log("error occured in fetchAllSoilTestController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    } 
}

export const updateSoilTestController = async(req,res)=>{
    try {
        console.log("Request body received in updateSoilTestController --->",req.body);
        let id = req.params.id;
        req.body.id = id;
        let response = await updateSoilTestModel(req.body);
        
        console.log("Update SoilTest Response--->",response);
        if(response.success){
            console.log(`Soil Test Details Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateSoilTestController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateSoilTestController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteSoilTestController = async(req,res)=>{
    try {
        console.log("Request body received in deleteSoilTestController --->",req.body);
        let id = req.params.id;
        req.body.id = id;
        let response = await deleteSoilTestModel(req.body);
        
        console.log("Delete SoilTest Response--->",response);
        if(response.success){
            console.log(`Soil Test Record Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteSoilTestController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteSoilTestController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}