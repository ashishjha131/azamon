const express = require("express");
const router = express.Router();
const {handleUserSignup} = require("../controller/user");

router.post("/register", handleUserSignup)

module.exports = router;