// Program - Do Numbers Ko Multiply Karne Ke Liye

// Express module ko import kar rahe ho
const express = require("express");

// Express app banate ho
const app = express();


// GET endpoint - /multiply path
app.get("/multiply" , function ( req , res ){
    // Console mein message print kar rahe ho
    console.log("req sent to multiply numbers");
    
    // Query parameter 'a' ko integer mein convert kar rahe ho
    const a = parseInt(req.query.a);
    // Query parameter 'b' ko integer mein convert kar rahe ho
    const b = parseInt(req.query.b);

    // JSON response mein multiply result bhej rahe ho
    res.json({
        answer: a * b
    })
})

// Port 2000 pe server listen kar rahe ho
app.listen(2000);