import { fetchAllFarmerModel } from "../model/model.js";

export const getTestController = async (req, res) => {
    try {
        console.log("Get test controller API Hit");
        const { name, price, description, category } = req.body;
        res.status(200).send({
            success: true,
            message: "Data Fetch Successfully",
        })
    } catch (error) {
        console.log("Error occured in testing Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
    // finally {
    //     try {
    //         await connection.close();
    //         console.log('Connection closed successfully.');
    //     } catch (err) {
    //         console.error('Error closing the connection: ' + err.stack);
    //     }
    // }
}

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