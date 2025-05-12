// JWT ko import kar rahe hain
const jwt = require("jsonwebtoken");

// Secret key jo token verify karte waqt use hoti hai
const JWT_SECRET = "s3cret";

// Middleware function jo routes ko protect karega (auth check karega)
function auth(req, res, next) {
    // Authorization header se token ko extract kar rahe hain
    const token = req.headers.authorization;

    try {
        // Token ko verify kar rahe hain using secret key (JWT_SECRET)
        // Agar token valid hai, toh decoded data (response) milega
        const response = jwt.verify(token, JWT_SECRET);

        // Agar token valid hai, toh userId ko request object mein store kar rahe hain
        req.userId = response.id; // Yeh assume karte hain ki token mein userId hai

        // Agar sab kuch theek hai, toh next middleware ya route ko call kar rahe hain
        next();
    } catch (error) {
        // Agar token invalid ho ya expired ho, toh 403 Forbidden error bhej rahe hain
        res.status(403).json({
            message: "Incorrect creds" // Error message jo user ko dikhegi
        });
    }
}

// auth function aur JWT_SECRET ko export kar rahe hain taaki dusre files mein use kiya ja sake
module.exports = {
    auth,
    JWT_SECRET
};
