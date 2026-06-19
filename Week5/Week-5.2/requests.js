// Express module ko import kar rahe ho
const express = require("express");

// Express app banate ho
const app = express();

// Request counter - kitne requests aaye
let requestCount = 0;

// Middleware function - har request par call hota hai
function requestIncreaser(req , res , next){
    // Counter ko increment kar rahe ho
    requestCount = requestCount + 1;
    // Console mein total requests print kar rahe ho
    console.log("Total Number Of Requests = " + requestCount);
    // Response bhej rahe ho (request ko early terminate kar rahe ho)
    res.json({
        message: "I Ended The Request Early",
    });
}

// Actual sum handler - agar middleware pass kare to yeh call hoga
function realSumHandler(req , res ){
    // Console mein message print kar rahe ho
    console.log("Control Reached The Real Handler")
    // Main logic

    // Query parameter 'a' ko integer mein convert kar rahe ho
    const a = parseInt( req.query.a );
    // Query parameter 'b' ko integer mein convert kar rahe ho
    const b = parseInt( req.query.b );
    // Console mein name print kar rahe ho (req object mein)
    console.log(req.name);

    // JSON response mein sum bhej rahe ho
    res.json({
        ans: a + b
    });
}

// Better routing - middleware aur handler dono use kar rahe ho
// /sum endpoint pe middleware pehle call hoga, phir handler
app.get("/sum", requestIncreaser , realSumHandler);

// Port 3000 pe server listen kar rahe ho
app.listen(3000);