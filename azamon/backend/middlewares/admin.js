const admin = (req, res, next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(400).json({message: "access denied"})
    }

}
module.exports = admin;
