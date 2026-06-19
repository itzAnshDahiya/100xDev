const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

// userMiddleware: request headers se token nikaal ke verify karega
function userMiddleware(req, res, next) {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        if (decoded) {
            // token mein store kiya hua user id req pe attach kar dete hain
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({ message: "You Are Not Signed In" });
        }
    } catch (error) {
        res.status(403).json({ message: "You Are Not Signed In" });
    }
}

module.exports = { userMiddleware: userMiddleware }