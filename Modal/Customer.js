const mongoose = require("mongoose")
const customerschema = mongoose.Schema({
    CustomerName:String,
    MobileNo:Number,
    Address:String
})
module.exports = mongoose.model("customer",customerschema)