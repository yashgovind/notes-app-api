const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

// flow -->
// token stored in head --> decode the jwt by verifying it with a secret key -> send to the front-end or user.

function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-api-token"];

    // get token from headers.

    if (!token) {
      return res.status(401).json("Unauthorized request.");
    }
    const decodedToken = jwt.verify(token, secretKey); // get the decoded token
    req.user = decodedToken; // send the payload....///

    next();
  } catch (error) {
    console.error(error.name);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json("Invalid token provided.");
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json("Token expired.");
    }
    return res
      .status(500)
      .json("Oops! Something went wrong. Cannot process your request.");
  }
  // check if token is present in header.
}

module.exports = verifyToken;

// check if token is present in header , decode the jwt, send the payload , return the
