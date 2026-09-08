const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const {webhook} = require("./controller/paymentController");
dotenv.config();
console.log("EMAIL:", process.env.user_email);
console.log("PASSWORD EXISTS:", !!process.env.user_pass);
const {connectDb} = require("./config/db")



const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));



connectDb();

// app.post("/api/payment/webhook", 
//     express.raw({type: "application/json"}),
//     webhook
//     );

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("this is home page")
})


app.use("/api/auth", require("./routes/userAuth"));
app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/payment", require("./routes/paymentRoutes"));



app.listen(process.env.PORT || 5000, ()=>{
    console.log("hello from server")
})