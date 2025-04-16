// const express = require('express')

// function calculateSum(n){
//     let sum = 0;
//     for(let i = 1 ; i <=n ; i++){
//         ans = ans + 1;
//     }
//     return ans;
// }

// const app = express();

// app.get("/" , function(req , res){
//     const n = req.query.n;
//     const ans = calculateSum(n);
//     res.send(ans.toString());
// })

// app.listen(3000);

const express = require("express")

const app = express();

app.get("/" , function(req , res){
    res.send("Hi There");
})

app.listen(3000);