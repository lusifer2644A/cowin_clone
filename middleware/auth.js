const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header("x-auth-token");

    //Check if not token
    if (!token)
        res.status(401).json({ message: "No token! Authorisation Denied" });

    try {
        const decoded = jwt.verify(token, config.get("JWT_SECRET_KEY"));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token isn't Valid " });
    }
};
