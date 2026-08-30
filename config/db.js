const mongoose = require("mongoose");

const connectDb = async()=> {
    await mongoose.connect(process.env.MongoUrl);
    console.log("mongo db started...")
}
module.exports = {connectDb};