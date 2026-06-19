// const express = require('express') // Express module ko import (commented)

// function calculateSum(n){ // Sum nikalne wala function
//     let sum = 0; // Initial sum 0
//     for(let i = 1 ; i <=n ; i++){ // Loop - 1 se n tak
//         ans = ans + 1; // Increment kar rahe ho
//     }
//     return ans; // Sum return kar rahe ho
// }

// const app = express(); // Express app banate ho (commented)

// app.get("/" , function(req , res){ // GET request handler (commented)
//     const n = req.query.n; // URL se 'n' parameter lena (commented)
//     const ans = calculateSum(n); // Sum calculate kar rahe ho (commented)
//     res.send(ans.toString()); // Response bhejte ho (commented)
// })

// app.listen(3000); // Port 3000 pe listen (commented)

// Express module ko import kar rahe ho
const express = require("express")

// Express app banate ho
const app = express();

// Root path (/) pe GET request aaye to yeh handler call hoga
app.get("/" , function(req , res){
    // "Hi There" message bhej rahe ho
    res.send("Hi There");
})

// Server port 3000 pe chalane lag jaata hai
app.listen(3000);