const mongoose = require("mongoose")

const orderschema = mongoose.Schema({
    OrderDate: {type:Date,default:new Date()},
    OrderAmount: Number,
    ItemNo: Number,
    OrderItems: [{ food: { type: mongoose.Schema.Types.ObjectId, ref: "food"}, qty: Number }],
    OrderStatus: String,
    CustId: { type: mongoose.Schema.Types.ObjectId, ref: "customer"}
})
module.exports = mongoose.model("order",orderschema)