// Importing necessary libraries
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");

// JWT secret key for signing tokens
const JWT_SECRET = "asdasd@!23";

// Initializing the Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Route to handle user signup
app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // Create a new user in the database
    await UserModel.create({
        email: email,
        password: password,
        name: name
    });

    // Respond with a success message
    res.json({
        message: " You are logged In "
    });
});

// Route to handle user signin
app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Check if user exists in the database with matching credentials
    const user = await UserModel.findOne({
        email: email,
        password: password
    });

    console.log(user); // Log the user info (for debugging)

    if(user) {
        // If user found, generate JWT token
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET); // Sign the token with the secret key

        // Respond with the token
        res.json({
            token: token
        });
    } else {
        // If no user found, send a 403 error
        res.sendStatus(403).json({
            message: " Incorrect Credentials "
        });
    }
});

// Middleware function for authentication (protect routes)
function auth(req, res, next) {
    const token = req.headers.token; // Get token from the request headers

    try {
        // Verify the token using JWT secret
        const decodedData = jwt.verify(token, JWT_SECRET);

        // If valid, set userId on the request object
        req.userId = decodedData.id;
        next(); // Continue to the next middleware/route
    } catch (error) {
        // If token is invalid or expired, return 403 error
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
}

// Route to create a new to-do item
app.post("/todo", auth, function(req, res) {
    const userId = req.userId; // Get the userId from the auth middleware
    const title = req.body.title;

    // Create a new to-do item associated with the userId
    TodoModel.create({
        title,
        userId
    });

    // Respond with the userId (indicating the to-do was created)
    res.json({
        userId: userId
    });
});

// Route to get all to-do items for the authenticated user
app.get("/todos", auth, async function(req, res) {
    const userId = req.userId; // Get userId from auth middleware

    // Find all to-do items for this user
    const todos = await TodoModel.find({
        userId
    });

    // Respond with the list of to-dos
    res.json({
        todos
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => console.log("Server is running on port 3000"));