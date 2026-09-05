const express = require("express");
const router = express.Router();
const {handleUserSignup, handleUserLogin, handleGetUsers} = require("../controller/user");
const {protect} = require("../middlewares/protect");
const admin = require("../middlewares/admin");

console.log("handleGetUsers:", typeof handleGetUsers);
console.log("protect:", typeof protect);
console.log("admin:", typeof admin);

router.post("/register", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/users",protect, admin, handleGetUsers);


module.exports = router;