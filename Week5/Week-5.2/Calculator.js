// Express module ko import kar rahe ho
const express = require("express");

// Express app banate ho
const app = express();

// GET endpoint - /sum - do numbers add karne ke liye
app.get("/sum", function(req, res) {
    // Query se 'a' parameter lena
    const a = req.query.a;
    // Query se 'b' parameter lena
    const b = req.query.b;

    // JSON response mein sum bhej rahe ho
    res.json({
        ans: a + b
    })
});

// GET endpoint - /divide - do numbers divide karne ke liye
app.get("/divide", function(req, res) {
    // Query se 'a' parameter lena
    const a = req.query.a;
    // Query se 'b' parameter lena
    const b = req.query.b;
    // JSON response mein division result bhej rahe ho
    res.json({
        ans: a / b
    })
});

// GET endpoint - /multiply - do numbers multiply karne ke liye
app.get("/multiply", function(req, res) {
    // Query se 'a' parameter lena
    const a = req.query.a;
    // Query se 'b' parameter lena
    const b = req.query.b;
    // JSON response mein multiplication result bhej rahe ho
    res.json({
        ans: a * b
    })
});

// GET endpoint - /subtract - do numbers subtract karne ke liye
app.get("/subtract", function(req, res) {
    // Query se 'a' parameter lena
    const a = req.query.a;
    // Query se 'b' parameter lena
    const b = req.query.b;
    // JSON response mein subtraction result bhej rahe ho
    res.json({
        ans: a - b
    })
});

// Port 3000 pe server listen kar rahe ho
app.listen(3000);

// More structured code (commented out - advanced version)
//         res.status(400).json({ error: "Both 'a' and 'b' must be valid numbers." });
//         return null;
//     }
//     return {a,b};
// }

// // Addition
// app.get("/sum", (req, res) => {
//     const nums = parseNumbers(req, res);
//     if (!nums) return;
//     res.json({ ans: nums.a + nums.b });
// });

// // Subtraction
// app.get("/subtract", (req, res) => {
//     const nums = parseNumbers(req, res);
//     if (!nums) return;
//     res.json({ ans: nums.a - nums.b });
// });

// // Multiplication
// app.get("/multiply", (req, res) => {
//     const nums = parseNumbers(req, res);
//     if (!nums) return;
//     res.json({ ans: nums.a * nums.b });
// });

// // Division
// app.get("/divide", (req, res) => {
//     const nums = parseNumbers(req, res);
//     if (!nums) return;
//     if (nums.b === 0) {
//         return res.status(400).json({ error: "Division by zero is not allowed." });
//     }
//     res.json({ ans: nums.a / nums.b });
// });

// // Modulus
// app.get("/modulus", (req, res) => {
//     const nums = parseNumbers(req, res);
//     if (!nums) return;
//     res.json({ ans: nums.a % nums.b });
// });

// // Power
// app.get("/power", (req, res) => {
//     const nums = parseNumbers(req, res);
//     if (!nums) return;
//     res.json({ ans: Math.pow(nums.a, nums.b) });
// });

// // Root (a-th root of b)
// app.get("/root", (req, res) => {
//     const nums = parseNumbers(req, res);
//     if (!nums) return;
//     if (nums.a === 0) {
//         return res.status(400).json({ error: "Root degree cannot be zero." });
//     }
//     res.json({ ans: Math.pow(nums.b, 1 / nums.a) });
// });

// // Welcome route
// app.get("/", (req, res) => {
//     res.send("Welcome to the Calculator API! Use /sum, /subtract, /multiply, /divide, /modulus, /power, /root with query params a and b.");
// });

// app.listen(3000, () => {
//     console.log("Calculator API running on port 3000");
// });