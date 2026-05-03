// Program - Do Numbers Ko Add Karne Ke Liye

// Express module ko import kar rahe ho
const express = require("express");

// Express app banate ho
const app = express();


// GET endpoint - /sum path
app.get("/sum" , function ( req , res ){
    // Console mein message print kar rahe ho
    console.log("req sent to sum ep");
    
    // Query parameter 'a' ko integer mein convert kar rahe ho
    const a = parseInt(req.query.a);
    // Query parameter 'b' ko integer mein convert kar rahe ho
    const b = parseInt(req.query.b);

    // JSON response mein sum bhej rahe ho
    res.json({
        answer: a + b
    })
})

// Port 3000 pe server listen kar rahe ho
app.listen(3000);


// const express = require("express"); // (commented out)\n
// const app = express(); // (commented out)\n
\n
// app.get("/divide" , function ( req , res ){ // (commented out)\n
//     console.log("req sent to sum ep"); // (commented out)\n
    // const a = parseInt(req.query.a); // (commented out)
//     const b = parseInt(req.query.b);

//     res.json({
//         answer: a / b
//     })
// })

// app.listen(3000);