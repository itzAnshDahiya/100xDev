// Express module ko import kar rahe ho
const express = require("express");

// Express app banate ho
const app = express();

// JSON middleware - body parsing
app.use(express.json());

// GET endpoint - root path pe HTML file send kar rahe ho
app.get("/", function(req, res) {
    // HTML file ko send kar rahe ho - __dirname se path relative hai
    res.sendFile(__dirname + "/public/index.html");
})

// POST endpoint - /sum pe do numbers ka sum nikaal rahe ho
app.post("/sum", function(req, res) {
    // Request body se 'a' parameter nikaal rahe ho aur integer mein convert kar rahe ho
    const a = parseInt(req.body.a);
    // Request body se 'b' parameter nikaal rahe ho aur integer mein convert kar rahe ho
    const b = parseInt(req.body.b);

    // JSON response mein sum bhej rahe ho
    res.json({
        answer: a + b
    })
})

// Port 3000 pe server listen kar rahe ho
app.listen(3000);