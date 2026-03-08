const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderDetailsSchema = new Schema({
 customerName:String,
 customerId:String,
 customerMobilenum:Number,
 customerAddress:String,
 itemList:[],
 cartValue:Number,
 orderStatus:{
    type:String,
    enum:['placed','preparing','ready_for_delivery','rider_allocated','on_the_way','delivered','cancelled'],
    default:'placed'
 },
 otp:Number,
 riderDetails:{},
})

module.exports = mongoose.model('orderDetails',orderDetailsSchema)