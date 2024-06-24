import { errorResponse } from "../config/errorResponse.js";
import { createCarbonCreditModel, fetchCarbonCreditModel } from "../model/model.js";

export const createCarbonCreditController = async(req,res)=>{
    try {
        console.log("Request body received in createCarbonCreditController --->",req.body);
        req.body.source = 'CarbonCredit'
        let response = await createCarbonCreditModel(req.body);
        
        console.log("Add Carbon Credit Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in createCarbonCreditController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in createCarbonCreditController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}

export const fetchCarbonCreditController = async(req,res)=>{
    try {
        console.log("Request body received in fetchCarbonCreditController --->",req.body);
        req.body.source = 'CarbonCredit'
        let response = await fetchCarbonCreditModel(req.body);
        
        console.log("Add Carbon Credit Response--->",response);
        if(response.success){
            res.status(200).send({
                success:true,
                message:response.message,
                data:response.data
            })
        }
        else{
            console.log("Some Error occured in fetchCarbonCreditController--->",response)
            res.status(200).send({
                success:false,
                message:response.message,
                error:response.error
            })
        }
        
    } catch (error) {
        console.log("Error occured in fetchCarbonCreditController--->",error)
        res.status(200).send({
            success:false,
            message:"Something Went Wrong... Please try again",
            error:errorResponse(1,error.message,error)
        })
    }
}