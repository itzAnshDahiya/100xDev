// dotenv se environment variables load karte hain
require('dotenv').config();

// Express aur mongoose import
const express = require("express");
const mongoose = require("mongoose");

// Route modules import
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

// Express app setup
const app = express();
app.use(express.json()); // body parsing middleware

// Route binding - API paths set kar rahe hain
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

// Main: DB connect aur server start
async function main() {
    // MONGO_URL .env se aayega
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(3000, () => {
        console.log("Server is running on port 3000...");
    });
}

main();
