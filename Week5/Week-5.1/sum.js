const express = require("express");

const app = express();


app.get("/sum" , function ( req , res ){
    console.log("req sent to sum ep");
    
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer: a + b
    })
})

app.listen(3001);


// const express = require("express");

// const app = express();


// app.get("/divide" , function ( req , res ){
//     console.log("req sent to sum ep");
    
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);

//     res.json({
//         answer: a / b
//     })
// })

// app.listen(3002);