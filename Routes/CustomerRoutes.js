
module.exports=(app)=>{
    CustomerController= require("../Controller/CustomerController")
    app.get("/customer",CustomerController.allcust)
    app.post("/addcust",CustomerController.addcust)
    app.post("/custid",CustomerController.custById)

}