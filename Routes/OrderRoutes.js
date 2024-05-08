
module.exports=(app)=>{
  const  Controller = require("../Controller/OrderController")
    app.get("/order",Controller.allorder)
    app.post("/addorder",Controller.addord)
    app.post("/getstatus",Controller.getOrdByStatus)
}