const Order = require('../models/oderDetails.model');

// Helper function to generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// --- POST METHODS ---

const saveorderdetails = async (req, res) => {
    try {
        const orderData = req.body;
        orderData.otp = generateOTP(); 
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const updateorderstatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { orderStatus: status }, 
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const resendotp = async (req, res) => {
    try {
        const newOtp = generateOTP();
        const updatedOrder = await Order.findByIdAndUpdate(
            req.body.orderId, 
            { otp: newOtp }, 
            { new: true }
        );
        res.status(200).json({ success: true, message: "OTP Resent", otp: newOtp });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const verifyotp = async (req, res) => {
    try {
        const { orderId, otp } = req.body;
        const order = await Order.findById(orderId);
        if (order && order.otp === Number(otp)) {
            res.status(200).json({ success: true, message: "OTP Verified Successfully" });
        } else {
            res.status(401).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const assignridermethod = async (req, res) => {
    try {
        const { orderId, riderDetails } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { riderDetails: riderDetails, orderStatus: 'rider_allocated' },
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// --- GET METHODS ---

const getallorder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const getordersbyid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const getorderbycustomermobilenumber = async (req, res) => {
    try {
        console.log(req.body.mobile)
        const orders = await Order.find({ customerMobilenum: req.body.mobile });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const getorderbyorderstatus = async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: req.params.status });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// --- EXPORT ALL METHODS ---
module.exports = {
    saveorderdetails,
    updateorderstatus,
    resendotp,
    verifyotp,
    assignridermethod,
    getallorder,
    getordersbyid,
    getorderbycustomermobilenumber,
    getorderbyorderstatus
};