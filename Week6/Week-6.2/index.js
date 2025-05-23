const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "kirat123123";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

// localhost:2000
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");     // __dirname means the current directory
})

app.post("/signup", logger, function(req, res) {
    const username = req.body.username
    const password = req.body.password
    users.push({
        username: username,
        password: password
    })

    // we should check if a user with this username already exists

    res.json({
        message: "You are signed in"
    })
})

app.post("/signin", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i]
        }
    }

    if (!foundUser) {
        res.json({
            message: "Credentials are incorrect"    //This will be displayed when the data filled is not right
        })
        return 
    } else {
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);
        res.header("jwt", token);

        res.header("random", "harkirat");

        res.json({
            token: token
        })
    }
})

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        // req = {status, headers...., username, password, userFirstName, random; ":123123"}
        req.username = decodedData.username
        next()
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

app.get("/me", logger, auth, function(req, res) {
    // req = {status, headers...., username, password, userFirstName, random; ":123123"}
    const currentUser = req.username;
    // const token = req.headers.token;
    // const decodedData = jwt.verify(token, JWT_SECRET);
    // const currentUser = decodedData.username

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            foundUser = users[i]
        }
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})

app.listen(1000);


// const express = require("express");
// const jwt = require("jsonwebtoken");

// const app = express();
// const PORT = 1000;
// const JWT_SECRET = "kirat123123";  // In real apps, keep secrets in environment variables

// app.use(express.json()); // Parses incoming JSON requests

// // In-memory store for users (for development/testing only)
// const users = [];

// // Logger middleware to track incoming requests
// function logger(req, res, next) {
//     console.log(`${req.method} request came to ${req.url}`);
//     next(); // Proceed to next middleware or route handler
// }

// // Serve the HTML page at root URL
// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/public/index.html"); // Serves a static HTML file
// });

// // Signup route - Registers a new user
// app.post("/signup", logger, function(req, res) {
//     const { username, password } = req.body;

//     // Check if user already exists
//     const existingUser = users.find(user => user.username === username);
//     if (existingUser) {
//         return res.status(400).json({ message: "User already exists" });
//     }

//     // Save new user
//     users.push({ username, password });

//     res.json({ message: "You are signed in" });
// });

// // Signin route - Authenticates user and returns JWT
// app.post("/signin", logger, function(req, res) {
//     const { username, password } = req.body;

//     // Find user with matching credentials
//     const foundUser = users.find(user => user.username === username && user.password === password);

//     if (!foundUser) {
//         return res.status(401).json({ message: "Credentials are incorrect" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ username: foundUser.username }, JWT_SECRET);

//     // Set custom headers (optional)
//     res.header("jwt", token);
//     res.header("random", "harkirat"); // Sample custom header

//     res.json({ token }); // Return token in response body
// });

// // Authentication middleware - Validates JWT
// function auth(req, res, next) {
//     const token = req.headers.token;

//     try {
//         const decodedData = jwt.verify(token, JWT_SECRET);
//         req.username = decodedData.username; // Attach username to request for downstream use
//         next(); // Proceed to protected route
//     } catch (err) {
//         return res.status(403).json({ message: "You are not logged in" });
//     }
// }

// // Protected route - Returns user details
// app.get("/me", logger, auth, function(req, res) {
//     const currentUser = req.username;

//     // Find the logged-in user
//     const foundUser = users.find(user => user.username === currentUser);

//     if (!foundUser) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//         username: foundUser.username,
//         password: foundUser.password // Never return password in real-world apps!
//     });
// });

// // Start the server
// app.listen(1000);
// });