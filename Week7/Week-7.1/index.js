const express = require("express"); // Express module ko import kar rahe hain
const { UserModel, TodoModel } = require("./db"); // User aur Todo models ko import kar rahe hain
const jwt = require("jsonwebtoken"); // JWT module ko import kar rahe hain
const JWT_SECRET = "asdasd@!23"; // JWT ke liye secret key

const app = express(); // Express app banate hain
app.use(express.json()); // JSON body parsing ke liye middleware use kar rahe hain

// Signup route: Naye user ko sign up karne ke liye
app.post("/signup", async function(req, res) {
    const { email, password, name } = req.body; // Email, password aur name ko request body se nikaal rahe hain

    // UserModel ke through naye user ko database mein insert kar rahe hain
    await UserModel.create({
        email: email,
        password: password,
        name: name
    });

    // Response mein success message bhej rahe hain
    res.json({
        message: "You are logged In"
    });
});

// Signin route: User ko sign in karne ke liye
app.post("/signin", async function(req, res) {
    const { email, password } = req.body; // Email aur password ko request body se nikaal rahe hain

    // UserModel se user ko database mein search kar rahe hain
    const user = await UserModel.findOne({
        email: email,
        password: password
    });

    console.log(user); // User ko console pe log kar rahe hain (debugging ke liye)

    if (user) {
        // Agar user milta hai, toh JWT token generate kar rahe hain
        const token = jwt.sign({
            id: user._id.toString() // User ka ID token mein embed kar rahe hain
        }, JWT_SECRET); // Secret key ke saath token ko sign kar rahe hain

        // Token ko response mein bhej rahe hain
        res.json({
            token: token
        });
    } else {
        // Agar user nahi milta, toh 403 error bhej rahe hain
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
});

// Todo create karne ka route (protected route)
app.post("/todo", auth, function(req, res) {
    const userId = req.userId; // Auth middleware se userId ko access kar rahe hain
    const title = req.body.title; // Todo ka title request body se le rahe hain

    // TodoModel mein naya todo create kar rahe hain
    TodoModel.create({
        title: title,
        userId: userId
    });

    // Response mein userId bhej rahe hain
    res.json({
        userId: userId
    });
});

// Todos ko fetch karne ka route (protected route)
app.get("/todos", auth, async function(req, res) {
    const userId = req.userId; // Auth middleware se userId ko access kar rahe hain

    // TodoModel se userId ke basis pe todos ko find kar rahe hain
    const todos = await TodoModel.find({
        userId: userId
    });

    // Todos ko response mein bhej rahe hain
    res.json({
        todos: todos
    });
});

// Auth middleware: Token verify karne ke liye
function auth(req, res, next) {
    const token = req.headers.token; // Request headers se token ko nikaal rahe hain

    try {
        // JWT token ko verify kar rahe hain
        const decodedData = jwt.verify(token, JWT_SECRET);

        // Agar token valid hai, toh decoded data se userId ko request object mein set kar rahe hain
        req.userId = decodedData.id; // `id` ko token mein se extract kar rahe hain
        next(); // Next middleware ya route ko call kar rahe hain
    } catch (error) {
        // Agar token invalid ho, toh 403 error bhej rahe hain
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
}

// Server ko 3000 port pe listen karwa rahe hain
app.listen(3000);
