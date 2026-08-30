const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, Secret_key);
        req.user = await User.findById(decoded.id).select(-password);
        next();
    }
    else{
        res.status(401).json({message: "Unauthorized"})
    }
    if(!token){
        res.status(401).json({message: "Unauthorized"})
    }
}

module.exports = {protect};