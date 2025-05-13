// Required packages ko import karte hain
const bcrypt = require("bcrypt");  // Password hashing ke liye
const express = require("express");  // Express framework for the server
const { UserModel, TodoModel } = require("./db");  // User aur Todo models ko import karte hain, jo MongoDB ke collections hain
const { auth, JWT_SECRET } = require("./auth");  // JWT authentication aur secret ko import karte hain
const jwt = require("jsonwebtoken");  // JWT tokens generate karne ke liye
const mongoose = require("mongoose");  // MongoDB ke saath connection banane ke liye

// MongoDB connection establish karna
mongoose.connect("")  // Yahan apna MongoDB connection string dalna padega

// Express app ko initialize karte hain
const app = express();
app.use(express.json());  // Request body ko JSON format mein parse karte hain

// Signup route
app.post("/signup", async function(req, res) {
    // User data ko validate karne ke liye zod ka use kar rahe hain (zod ek validation library hai)
    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),  // Email ko validate kar rahe hain ki wo valid ho
        name: z.string().min(3).max(100),  // Name ki length validate kar rahe hain
        password: z.string().min(5).max(30)  // Password ki length validate kar rahe hain
    });

    // Data ko parse karte hain aur safeParse se validation check karte hain
    const parsedDataWithSuccess = requireBody.safeParse(req.body);

    // Agar data invalid hai toh user ko message bhejte hain
    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect Format"  // Format galat hai
        });
        return;  // Code yahin stop karte hain
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // Agar email galat format mein hai toh error denge
    if (typeof email != "string" || email.length < 5 || !email.includes("@")) {
        res.json({
            message: "Email Incorrect Check The Credentials"  // Invalid email format
        });
        return;  // Agar email galat hai toh code yahin rok denge
    }

    // Password ko hash kar rahe hain (5 rounds of hashing)
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);  // Hashed password ko log kar rahe hain for debugging

    // User ko database mein save karte hain
    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });

    // Response mein success message bhejte hain
    res.json({
        message: "You are signed up"  // User successfully signup ho gaya
    });
});

// Signin route
app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Email ke saath user ko dhoond rahe hain database mein
    const response = await UserModel.findOne({
        email: email,
    });

    // Agar user nahi milta, toh error response denge
    if(!response){
        res.status(403).json({
            message: "User Does Not Exist In Our Database"  // User nahi mila
        });
        return;  // Code yahin rok denge
    }

    // Password ko compare kar rahe hain
    const passwordMatch = await bcrypt.compare(password, response.password);

    // Agar password match ho gaya, toh JWT token generate karenge
    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()  // JWT mein user ka id bhej rahe hain
        }, JWT_SECRET);  // Secret key ka use karke token sign kar rahe hain

        res.json({
            token  // Token ko response mein bhej rahe hain
        });
    } else {
        // Agar password match nahi hota, toh error response denge
        res.status(403).json({
            message: "Incorrect creds"  // Password ya email galat hai
        });
    }
});

// Todo creation route
app.post("/todo", auth, async function(req, res) {
    // auth middleware ka use karke user ko authenticate kar rahe hain
    const userId = req.userId;  // Auth se user ka id le rahe hain
    const title = req.body.title;  // Todo title
    const done = req.body.done;  // Todo status (done ya not done)

    // Todo ko database mein create kar rahe hain
    await TodoModel.create({
        userId,
        title,
        done
    });

    // Response mein success message bhej rahe hain
    res.json({
        message: "Todo created"  // Todo successfully create ho gaya
    });
});

// Get todos route (fetching all todos for the authenticated user)
app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;  // Auth se user ka id le rahe hain

    // User ke saare todos fetch kar rahe hain
    const todos = await TodoModel.find({
        userId
    });

    // Todos ko response mein bhej rahe hain
    res.json({
        todos  // Saare todos user ke liye
    });
});

// Server ko listen karwa rahe hain port 3000 par
app.listen(2000);  // Server ko 2000 port par chalane ke liye
