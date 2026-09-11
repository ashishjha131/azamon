const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {webhook} = require("./controller/paymentController");
dotenv.config();
console.log("EMAIL:", process.env.user_email);
console.log("PASSWORD EXISTS:", !!process.env.user_pass);
const {connectDb} = require("./config/db")



const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));



connectDb();

app.post("/api/payment/webhook", 
    express.raw({type: "application/json"}),
    webhook
    );

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("this is home page")
})


const authRoutes = require("./routes/userAuth");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
console.log("ORDER ROUTES:", orderRoutes);
console.log("TYPE:", typeof orderRoutes);
const paymentRoutes = require("./routes/paymentRoutes");

console.log("authRoutes:", typeof authRoutes);
console.log("productRoutes:", typeof productRoutes);
console.log("orderRoutes:", typeof orderRoutes);
console.log("paymentRoutes:", typeof paymentRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);



app.listen(process.env.PORT || 5000, ()=>{
    console.log("hello from server")
})