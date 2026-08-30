const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const {connectDb} = require("./config/db")



const app = express();


connectDb();

app.get("/", (req,res)=>{
    res.send("this is home page")
})

// app.use("/api/auth", require("./routes/userAuth"));

app.listen(process.env.PORT || 5000, ()=>{
    console.log("hello from server")
})