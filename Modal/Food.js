const mongoose = require("mongoose")

const foodschema = mongoose.Schema({
    FoodName: String,
    FoodType: String,
    FoodCategory: String,
    FoodPrice: Number,
    FoodImage: String,
    FoodIsAvailable:Boolean
})
module.exports = mongoose.model("food",foodschema)