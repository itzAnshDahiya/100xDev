// Program to Multiply Two Numbers

const express = require("express");

const app = express();


app.get("/multiply" , function ( req , res ){
    console.log("req sent to multiply numbers");
    
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer: a * b
    })
})

app.listen(2000);