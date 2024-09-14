import { errorResponse } from "../config/errorResponse.js";
import { createUserModel, fetchAllFpoModel, fetchFarmerByFpoModel, fetchSingleFpoModel, loginModel, sendOtpModel } from "../model/model.js";
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'my-high-level-secret-key';

export const loginController = async (req, res) => {
    try {
        console.log("Request Body Received in loginController");
        let result = await loginModel(req.body);
        console.log("Result--->", result)
        if (result.success) {
            var token = jwt.sign(result.data, SECRET_KEY);
            console.log("login token--->", token)
            res.status(200).send({
                success: true,
                message: result.message,
                data: { ...result.data, token }
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: result.message,
                error: result.error
            })
        }
    } catch (error) {
        console.log("error occured in loginController--->", error)
        res.status(200).send({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }

}

export const sendOtpController = async (req, res) => {
    try {
        console.log("Request Body Received in sendOtpController");
        let result = await sendOtpModel(req.body);
        console.log("Result--->", result)
        if (result.success) {
            // here you can do axios call to send otp
            // if success , Otp send successful
            // else , failed to send otp
            res.status(200).send({
                success: true,
                message: result.message,
                data: result.data
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: result.message,
                error: result.error
            })
        }
    } catch (error) {
        console.log("error occured in sendOtpController--->", error)
        res.status(200).send({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }

}

export const verifyOtpController = async (req, res) => {
    try {
        console.log("Request Body Received in verifyOtpController");
        // let result = await sendOtpModel(req.body);
        // console.log("Result--->", result)
        if (req.body.otp == '123456') {
            let result = await sendOtpModel(req.body);
            console.log("Result--->", result)
            if (result.success) {
                var token = jwt.sign(result.data, SECRET_KEY);
                console.log("login token at verify otp--->", token)
                res.status(200).send({
                    success: true,
                    message: "OTP verified successfully",
                    data: { ...result.data, token }
                })
            }
            else {
                res.status(200).send({
                    success: false,
                    message: result.message,
                    error: result.error
                })
            }
        }
        else {
            res.status(200).send({
                success: false,
                message: "Invalid Otp... Please try again",
                error: []
            })
        }

        // if(result.success){
        //     // here you can do axios call to send otp
        //     // if success , Otp send successful
        //     // else , failed to send otp
        //     res.status(200).send({
        //         success:true,
        //         message:result.message,
        //         data:result.data
        //     })
        // }
        
    } catch (error) {
        console.log("error occured in verifyOtpController--->", error)
        res.status(200).send({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }

}

export const createUserController = async (req, res) => {
    try {
        console.log("Request Body Received in createUserController");
        let result = await createUserModel(req.body);
        console.log("Result--->", result)
        if (result.success) {
            res.status(200).send({
                success: true,
                message: result.message,
                data: result.data
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: result.message,
                error: result.error
            })
        }
    } catch (error) {
        console.log("error occured in createUserController--->", error)
        res.status(200).send({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }

}

export const fetchFarmerByFpoController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchFarmerByFpoController");
        req.body.code = req.params.code;
        let result = await fetchFarmerByFpoModel(req.body);
        console.log("Result--->", result)
        if (result.success) {
            res.status(200).send({
                success: true,
                message: result.message,
                data: result.data
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: result.message,
                error: result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchFarmerByFpoController--->", error)
        res.status(200).send({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }

}
export const fetchSingleFpoController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchSingleFpoController");
        req.body.code = req.params.code;
        let result = await fetchSingleFpoModel(req.body);
        console.log("Result--->", result)
        if (result.success) {
            res.status(200).send({
                success: true,
                message: result.message,
                data: result.data
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: result.message,
                error: result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchSingleFpoController--->", error)
        res.status(200).send({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }

}
export const fetchAllFpoController = async (req, res) => {
    try {
        console.log("Request Body Received in fetchAllFpoController");
        let result = await fetchAllFpoModel(req.body);
        console.log("Result--->", result)
        if (result.success) {
            res.status(200).send({
                success: true,
                message: result.message,
                totalFPO:result.totalFPO,
                data: result.data
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: result.message,
                error: result.error
            })
        }
    } catch (error) {
        console.log("error occured in fetchAllFpoController--->", error)
        res.status(200).send({
            success: false,
            message: "Something Went Wrong... Please try again",
            error: errorResponse(1, error.message, error)
        })
    }

}