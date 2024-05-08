module.exports=(app)=>{
    FoodController= require("../Controller/FoodController")
    app.get("/food",FoodController.allfood)
    app.post("/addfood",FoodController.addfood)
    app.post("/getfcate",FoodController.getfoodByCategory)
    app.post("/getftype",FoodController.getfoodByType)
    app.delete("/delfood",FoodController.deletefood)
    app.post("/updatefood",FoodController.updatefood)
    
}