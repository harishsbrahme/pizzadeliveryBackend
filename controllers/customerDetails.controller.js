const customerdetailsModel = require('../models/customerDetails.model');

const saveCustomerdetails = async (req, res) => {
    try {
        console.log(req.body);
        
        const saveCustomerDetails = await customerdetailsModel.insertOne(req.body);
        
        res.status(200).json({
            success: true,
            data: saveCustomerDetails
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const loginCustomer = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        // 1. Find the customer in the database by mobile number
        const customer = await customerdetailsModel.findOne({ mobileNumber: mobileNumber });

        // 2. Check if customer exists
        if (!customer) {
            return res.status(200).json({ 
                success: false, 
                message: "Mobile number not registered." 
            });
        }

        // 3. Simple Password Comparison (Normal Flow)
        if (customer.password === password) {
            // SUCCESS
            res.status(200).json({
                success: true,
                message: "Login successful!",
                data: {
                    _id: customer._id,
                    customerName: customer.customerName,
                    mobileNumber: customer.mobileNumber,
                    address: customer.address
                }
            });
        } else {
            // WRONG PASSWORD
            res.status(200).json({ 
                success: false, 
                message: "Incorrect password." 
            });
        }

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error occurred." 
        });
    }
};

const updateCustomerdetails = async (req, res) => {
    try {
        const updateData = req.body;

        const result = await customerdetailsModel.updateOne(
            { _id: req.body._id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Pizza not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pizza updated successfully",
            data: result
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

const deleteCustomerdetails = async (req,res) =>{
    try {

        const result = await customerdetailsModel.deleteOne(
            { _id: req.body._id }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Pizza not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pizza details deleted successfully",
            data: result
        });

    } catch (error) {
        console.error("delete Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

const getAllCustomerdetails = async (req,res) =>{
    try {

        const result = await customerdetailsModel.find();

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("getAllPizzadetails Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

const getCustomerdetailsbyId = async (req,res) =>{
    try {

        const result = await customerdetailsModel.findOne(
            { _id: req.body._id }
        );

        console.log(result);
        

        if (result == null) {
            return res.status(404).json({
                success: false,
                message: "Pizza not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pizza details got successfully",
            data: result
        });

    } catch (error) {
        console.error("Pizza details Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}


module.exports = {
    saveCustomerdetails,
    updateCustomerdetails,
    deleteCustomerdetails,
    getAllCustomerdetails,
    getCustomerdetailsbyId,
    loginCustomer
};