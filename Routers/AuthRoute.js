const express = require('express');
const router = express.Router();
const { signUpController , loginController} = require("../Controllers/userAuth");


router.post("/signup", signUpController); // path is "/auth/signup"

router.post("/login", loginController); // path is "/auth/login"


module.exports = router;