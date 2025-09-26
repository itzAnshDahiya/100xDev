// dotenv package ko require kar rahe hain taaki environment variables ko load kar sakein.
require('dotenv').config();

// Express ko require kar rahe hain, jo ki web framework hai server create karne ke liye.
const express = require("express");

// Mongoose ko require kar rahe hain jo MongoDB ke saath interact karega.
const mongoose = require("mongoose");

// Route files ko import kar rahe hain. 
// userRouter, courseRouter, aur adminRouter ko respective routes ke liye import kiya gaya hai.
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

// Express app banate hain
const app = express();

// Middleware jo JSON data ko parse karega. Ye ensure karta hai ki request body JSON format mein ho.
app.use(express.json());

// Routes ko bind kar rahe hain.
// Har route specific URL pattern ke liye handle karega. 
// Example: '/api/v1/user' path par userRouter handle karega.
app.use("/api/v1/user", userRouter);   // "/api/v1/user" path ko userRouter se handle karo
app.use("/api/v1/course", courseRouter); // "/api/v1/course" path ko courseRouter se handle karo
app.use("/api/v1/admin", adminRouter);  // "/api/v1/admin" path ko adminRouter se handle karo

// Main function jo MongoDB se connect karega aur server ko start karega
async function main() {
    // Mongoose ko MongoDB se connect karne ke liye, URL ko environment variable se fetch kiya gaya hai.
    await mongoose.connect(process.env.MONGO_URL);

    // Server ko 3000 port par listen karne ke liye start kar rahe hain.
    app.listen(3000, () => {
        console.log("Server is running on port 3000...");
    });
}

// Main function ko call karke server start karte hain.
main();
