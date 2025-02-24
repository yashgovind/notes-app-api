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
    const { email, password } = req.body; // find the user by their email.

    if (!email || !password) {
      return res.status(400).json("Enter valid email and password to login.");
    }

    const user = await model.findOne({ email }); // check if email and password are provided

    if (!user) {
      // chekc if user exists.
      return res.status(400).json("Entered credentials are not valid.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password); // compare the password

    if (!isValidPassword) {
      return res.status(400).json("Entered credentials are not valid.");
    }

    // send jwt token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      secretKey,
      {
        expiresIn: "1hr",
      }
    );

    //   console.log('token is ', token);

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
