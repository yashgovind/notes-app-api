const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;



function verifyToken(req, res, next) {
    try {

        const token = req.headers("X-API-Token");
        // get token from headers.

        if (!token) {
            return res.stats(401).json("error");
        }
        const decodedToken = jwt.verify(token, secretKey); // get the decoded token
        req.user = decodedToken; // send token to user . but whats this.
        next();

    } catch (error) {

        console.error(error.message);
        return res.status(500).json("server down");
    }
    // check if token is present in header.

}



module.exports = verifyToken;


// check if token is present in header , decode the jwt and return the response(attach user data to it)