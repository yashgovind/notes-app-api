const model = require("../models/Authmodel");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

async function signUpController(req, res) {
  try {
    const { name, email, password } = req.body;
    let saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds); // create salt.
    const hashedPassword = await bcrypt.hash(password, salt); // hash password with salt.
    console.log("original password is :", password);
    console.log("hashed password is:", hashedPassword);
    const newUser = await model.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("error");
  }
}

async function loginController(req, res) {
  try {
    const { name,email, password } = req.body; // find the user by their email.
    const user = await model.findOne({ email }); // check if email and password are provided
    if (!email || !password) {
      res.status(404).json("give username and passsword");
    }
    if (!user) { // chekc if user exists.
        return res.status(404).json({ error: "User not found" });
      }

    const isValidPassword = await bcrypt.compare(password, user.password); // compare the password
    if (!isValidPassword) {
      res.status(404).json(" password is wrong");
    }

    // send jwt token
    const token = jwt.sign({ id: user._id , name,email}, secretKey, {
      expiresIn: "1hr",
    });
    //   console.log('token is ', token);
    // maybe i need to store in local storage 
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("error");
  }
}

module.exports = {
  signUpController,
  loginController,
};
