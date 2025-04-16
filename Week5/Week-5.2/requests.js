const express = require("express");

const app = express();

let requestCount = 0;
function requestIncreaser(req , res , next){
    requestCount = requestCount + 1;
    console.log("Total Number Of Requests = " + requestCount);
    res.json({
        message: "I Ended The Request Early",
    });
}

function realSumHandler(req , res ){
    console.log("Control Reached The Real Handler")
    //main logic
    const a = parseInt( req.query.a );
    const b = parseInt( req.query.b );
    console.log(req.name);

    res.json({
        ans: a + b
    });
}

//better routing , add database , middlewares
app.get("/sum", requestIncreaser , realSumHandler);

app.listen(3000);