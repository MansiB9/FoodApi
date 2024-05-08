const express=require("express")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const cors=require("cors")
const multer = require("multer")
const path = require("path")
const Razorpay = require('razorpay')
const shortid = require('shortid')
const crypto = require("crypto")
const { env } = require("process")
const { Server } = require("http")
require("dotenv").config();


//creating app
const app=express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

var razorpay = new Razorpay({
 key_id:
 process.env.RAZORPAY_KEY_ID,
 key_secret:process.env.RAZORPAY_KEY_SECRET,
});

app.post("/verification",(req,res) =>{
    const secret ="razorpaysecret";
    console.log(req.body);

    const shasum = crypto.createHmac("sha256",secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    
    console.log(digest,req.headers["x-razorpay-signature"]);

    if(digest === req.headers["x-razorpay-signature"]){
        console.log("request is legit");
        res.status(200).json({
            message:"OK",
        });
    }else{
        res.status(403).json({
            message:"Invalid"});
    }
});

app.post("/razorpay",async(req,res) => {
    const payment_capture=1;
    const amount = Number(req.body.amt * 100)
    const currency = "INR";

    const options = {
        amount,
        currency,
        receipt:shortid.generate(),
        payment_capture,
    };
    try{
        const response = await
        razorpay.orders.create(options);
        console.log(response);
        res.status(200).json({
           id:response.id,
           currency:response.currency,
           amount:response.amount, 
        });
    }catch(err) {
        console.log(err);
    }
});




//connecting database
mongoose.connect("mongodb://127.0.0.1:27017/foodDb",{
   useNewUrlParser:true
}).then((result)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Not Connected")
});

require("./Routes/OrderRoutes")(app)
require("./Routes/UserRoute")(app)
require("./Routes/FoodRoutes")(app)
require("./Routes/CustomerRoutes")(app)
//require("./routes/ProductRoutes")(app)


app.get("/",(req,res)=>{
    res.send("hlww")
})

//file  storage configuration
const imageStorage = multer.diskStorage({
    destination:"Image",
    filename:(req,file,cb)=>{
        cb(
            null,
            file.fieldname + "_" + Date.now() +path.extname(file.originalname)
        );
    },
}); 

//file upload configuration
const imageUpload = multer({
    storage: imageStorage,

    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|jfif)$/)){
            return cb(new Error("Please Upload a Image....."));
        }
        cb(undefined, true);
    },
});


    //file upload post req
    app.post( 
        "/uploadimage",
        imageUpload.single("image"),
        (req,res)=>{
            res 
            .status(200)
            .json({filepath:"/images/".concat(req.file.filename), uploaded:true });
        },
        (err,req,res,next)=>{
            res.status(500).send({err:err.message});
        }
     );


app.use("/images",express.static("Image"))


app.listen(5000,()=>{
    console.log("...server started")
})
