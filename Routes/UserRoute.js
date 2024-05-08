module.exports=(app)=>{

    const userController = require("../Controller/UserController")
    // const { verifyusertoken, IsUser, IsAdmin } = require("../middleware/Auth")
    //const verify = require("../middleware/Auth")
    
    app.post("/register", userController.register)
    app.get("/all", userController.all)
    // router.get("/varifyuser", verify.verifyusertoken)
    app.post("/login", userController.login)
    
    app.get("/evts",  userController.userEvent)
    app.get("/isadmin",  userController.adminEvent)
}