// server.js Hai
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

// Middleware Hai Ye
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "mySecretKey", //Yaha Pr Secret Key Use Kro
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,   // Client Side JS Acces Ko Prevent Krta Hai
      secure: false,    // True Set Kro Jb Https Use Kro
      maxAge: 1000 * 60 * 60, // 1 hour Ke Liye Valid Rahegi Cookie
    },
  })
);

// Fake user Ka data
const USER = { username: "test", password: "1234" };

// Login Ka Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    req.session.user = username; // Username Ko Store Krta Hai Session Mai
    return res.json({ message: "Login successful" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Protection Ke Liye Route
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    return res.json({ message: `Welcome ${req.session.user}!` });
  }
  res.status(401).json({ message: "Unauthorized" });
});

// Logout Ka Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.clearCookie("connect.sid"); // cookie Yaha Pr Clear Hoti Hai
    res.json({ message: "Logged out" });
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});



//----------------------TEST CASE-----------------------------

// POST /login with { "username": "test", "password": "1234" }
// GET /dashboard → requires login cookie
// POST /logout