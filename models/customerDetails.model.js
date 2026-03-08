const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const customerDetailsSchema = new Schema({
  customerName:String,
  mobileNumber:Number,
  address:String,
  password:String,
})

module.exports = mongoose.model('customerDetails',customerDetailsSchema)