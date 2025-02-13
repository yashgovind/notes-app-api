const express = require('express');
const router = express.Router();
const { signUpController , loginController} = require("../Controllers/userAuth");


router.post("/signup", signUpController);

router.get("/login", loginController);


module.exports = router;