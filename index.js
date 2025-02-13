const express = require('express');
const app = express();
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const authRoute = require("./Routers/AuthRoute");
app.set("view engine");
const port = process.env.PORT||4800;
const mongoPath = process.env.MONGO_URI;
const apiPath = `http://locahost:${port}`;
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoute); // for authorization


// root url
app.get("/", (req, res) => {
    res.send('hello')
})


// connections .
mongoose.connect(mongoPath).then(() => {
    console.log("connected to db");
}).catch((err)=> {
    console.error(err.message);
})

app.listen(port, () => {
    console.log(`running at port ${port} at ${apiPath}`);
})