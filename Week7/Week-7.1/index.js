// const express = require("express"); // Express module ko import kar rahe hain
// const { UserModel, TodoModel } = require("./db"); // User aur Todo models ko import kar rahe hain
// const jwt = require("jsonwebtoken"); // JWT module ko import kar rahe hain
// const JWT_SECRET = "asdasd@!23"; // JWT ke liye secret key

// const app = express(); // Express app banate hain
// app.use(express.json()); // JSON body parsing ke liye middleware use kar rahe hain

// // Signup route: Naye user ko sign up karne ke liye
// app.post("/signup", async function(req, res) {
//     const { email, password, name } = req.body; // Email, password aur name ko request body se nikaal rahe hain

//     // UserModel ke through naye user ko database mein insert kar rahe hain
//     await UserModel.create({
//         email: email,
//         password: password,
//         name: name
//     });

//     // Response mein success message bhej rahe hain
//     res.json({
//         message: "You are logged In"
//     });
// });

// // Signin route: User ko sign in karne ke liye
// app.post("/signin", async function(req, res) {
//     const { email, password } = req.body; // Email aur password ko request body se nikaal rahe hain

//     // UserModel se user ko database mein search kar rahe hain
//     const user = await UserModel.findOne({
//         email: email,
//         password: password
//     });

//     console.log(user); // User ko console pe log kar rahe hain (debugging ke liye)

//     if (user) {
//         // Agar user milta hai, toh JWT token generate kar rahe hain
//         const token = jwt.sign({
//             id: user._id.toString() // User ka ID token mein embed kar rahe hain
//         }, JWT_SECRET); // Secret key ke saath token ko sign kar rahe hain

//         // Token ko response mein bhej rahe hain
//         res.json({
//             token: token
//         });
//     } else {
//         // Agar user nahi milta, toh 403 error bhej rahe hain
//         res.status(403).json({
//             message: "Incorrect Credentials"
//         });
//     }
// });

// // Todo create karne ka route (protected route)
// app.post("/todo", auth, function(req, res) {
//     const userId = req.userId; // Auth middleware se userId ko access kar rahe hain
//     const title = req.body.title; // Todo ka title request body se le rahe hain

//     // TodoModel mein naya todo create kar rahe hain
//     TodoModel.create({
//         title: title,
//         userId: userId
//     });

//     // Response mein userId bhej rahe hain
//     res.json({
//         userId: userId
//     });
// });

// // Todos ko fetch karne ka route (protected route)
// app.get("/todos", auth, async function(req, res) {
//     const userId = req.userId; // Auth middleware se userId ko access kar rahe hain

//     // TodoModel se userId ke basis pe todos ko find kar rahe hain
//     const todos = await TodoModel.find({
//         userId: userId
//     });

//     // Todos ko response mein bhej rahe hain
//     res.json({
//         todos: todos
//     });
// });

// // Auth middleware: Token verify karne ke liye
// function auth(req, res, next) {
//     const token = req.headers.token; // Request headers se token ko nikaal rahe hain

//     try {
//         // JWT token ko verify kar rahe hain
// Express aur JWT, mongoose import kar rahe hain
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Models import
const { UserModel, TodoModel } = require("./db");

// Express app init
const app = express();
app.use(express.json());

// MongoDB connection string (demo ke liye hardcoded)
mongoose.connect("mongodb+srv://100xdevs:WvaTca0509mb90YX@cluster0.ossjd.mongodb.net/todo-harkirat-2222");

// JWT secret (demo)
const JWT_SECRET = "hellobacchomajaloclasska";

// Signup route: body se email, password, name leke user create karta hai
app.post("/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        await UserModel.create({ email: email, password: password, name: name });
    } catch (error) {
        return res.status(400).json({ message: "User already exists!" });
    }
    res.json({ message: "You are signed up!" });
});

// Signin route: email/password check karke token return karta hai
app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({ email: email, password: password });
    if (user) {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        res.json({ token: token, message: "You are signed in!" });
    } else {
        res.status(403).json({ message: "Invalid Credentials!" });
    }
});

// Auth middleware: request headers se token verify kar deta hai
function auth(req, res, next) {
    const token = req.headers.authorization;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData) {
        req.userId = decodedData.id;
        next();
    } else {
        res.status(403).json({ message: "Invalid Token!" });
    }
}

// Create todo: authenticated user ke liye todo create karta hai
app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    await TodoModel.create({ userId, title, done });
    res.json({ message: "Todo created" });
});

// Get todos: authenticated user ke saare todos return karta hai
app.get("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({ userId });
    res.json({ todos });
});

// Server start
app.listen(3000);
});

// Create a GET route for the todo endpoint
app.get("/todo", auth, async function (req, res) {
    // Get the userId from the request object
    const userId = req.userId;

    // Find all the todos with the given userId
    const todos = await TodoModel.find({
        userId,
    });

    // Send the todos to the client
    res.json({
        todos,
    });
});

// Start the server on port 3000
app.listen(3000);
