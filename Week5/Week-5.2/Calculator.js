const express = require("express");

const app = express();

app.get("/sum", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;

    res.json({
        ans: a + b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })
});
    app.get("/multiply", function(req, res) {
        const a = req.query.a;
        const b = req.query.b;
        res.json({
            ans: a * b
        })
});

app.get("/subtract", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a - b
    })
});

app.listen(3000);



//-----------------------More structured code----------------------//
// const express = require("express");
// const app = express();
// app.use(express.json());

// Helper function to parse and validate numbers
// function parseNumbers(req, res) {
//     const a = Number(req.query.a);
//     const b = Number(req.query.b);
//     if (isNaN(a) || isNaN(b)) {
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