// Program To Add Two Numbers

const express = require("express");

const app = express();


app.get("/difference" , function ( req , res ){
    console.log("req sent to difference ep");
    
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer: a - b
    })
})

app.listen(3000);
