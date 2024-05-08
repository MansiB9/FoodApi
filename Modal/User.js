const mong = require("mongoose")
const Authschema = mong.Schema({
    name: String,
    Email : String,
    Password : String,
    User_type_id: Number
})
module.exports = mong.model("Authentication",Authschema)