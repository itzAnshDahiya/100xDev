"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Express framework for creating web server
const express_1 = __importDefault(require("express"));
// Import pg library to connect to PostgreSQL database
const pg_1 = require("pg");
// Create an Express application
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Create a PostgreSQL client to connect to the database
const pgClient = new pg_1.Client({
    user: "neondb_owner",
    password: "Write the Password Here",
    port: 5432,
    host: "Write the Host Data Here",
    database: "neondb"
});
// Connect to the database when the app starts
pgClient.connect().catch((err) => {
    console.error("Database connection failed:", err);
});
// TODO APP - User Signup Route
// This is a POST endpoint where users can register
app.post("/signup", async (req, res) => {
    try {
        // Extract user input from the request body
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        // Validate that all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields (username, email, password) are required"
            });
        }
        // Execute SQL INSERT query using parameterized query (safe from SQL injection)
        // This adds the user data into the users table in the database
        const response = await pgClient.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id", [username, email, password]);
        // Send success response with the newly created user's ID
        res.json({
            message: "You Have Signed Up Successfully",
            userId: response.rows[0].id
        });
    }
    catch (error) {
        // If something goes wrong (database error, invalid data, etc.), send error response
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Signup failed",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
