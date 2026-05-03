// Program - Do Numbers Ka Difference Nikalne Ke Liye

// Express module ko import kar rahe ho
const express = require("express");

// Express app banate ho
const app = express();


// GET endpoint - /difference path
app.get("/difference" , function ( req , res ){
    // Console mein message print kar rahe ho
    console.log("req sent to difference ep");
    
    // Query parameter 'a' ko integer mein convert kar rahe ho
    const a = parseInt(req.query.a);
    // Query parameter 'b' ko integer mein convert kar rahe ho
    const b = parseInt(req.query.b);

    // JSON response mein difference bhej rahe ho
    res.json({
        answer: a - b
    })
})

// Port 3000 pe server listen kar rahe ho
app.listen(3000);
