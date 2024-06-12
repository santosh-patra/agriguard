import { addNewFarmerModel, deleteFarmerModel, fetchAllFarmerModel, fetchSingleFarmerModel, totalFarmerCountModel, updateFarmerModel } from "../model/model.js";

export const fetchTotalFarmerController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchTotalFarmerController",req.body);
        let result = await fetchAllFarmerModel(req.body);
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
                message:"Unable to fetch Farmer Details",
                error:result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchTotalFarmerController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const totalFarmerCountController = async(req,res)=>{
    try {
        console.log("Request body received in totalFarmerCountController --->",req.body);
        let response = await totalFarmerCountModel(req.body);
        
        console.log("Total Farmer Response--->",response);
        if(response.success){
            console.log(`Fetching total Farmer`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in totalFarmerCountController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in searchProductController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const fetchSingleFarmerController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleFarmerController",req.body);
        let id = req.params.id;
        req.body.id = id;
        let result = await fetchSingleFarmerModel(req.body);
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
        console.log("error occured in fetchSingleFarmerController--->", error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
    
}

export const addNewFarmerController = async(req,res)=>{
    try {
        console.log("Request body received in addNewFarmerController --->",req.body);
        let response = await addNewFarmerModel(req.body);
        
        console.log("Add Farmer Response--->",response);
        if(response.success){
            console.log(`Farmer Added Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in addNewFarmerController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in addNewFarmerController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const updateFarmerController = async(req,res)=>{
    try {
        console.log("Request body received in updateFarmerController --->",req.body);
        let id = req.params.id;
        req.body.id = id;
        let response = await updateFarmerModel(req.body);
        
        console.log("Update Farmer Response--->",response);
        if(response.success){
            console.log(`Farmer Details Updated Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in updateFarmerController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in updateFarmerController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}
export const deleteFarmerController = async(req,res)=>{
    try {
        console.log("Request body received in deleteFarmerController --->",req.body);
        let id = req.params.id;
        req.body.id = id;
        let response = await deleteFarmerModel(req.body);
        
        console.log("Delete Farmer Response--->",response);
        if(response.success){
            console.log(`Farmer Deleted Successfully`)
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in deleteFarmerController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in deleteFarmerController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}