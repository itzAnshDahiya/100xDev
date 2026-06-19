import { Express } from "express";
import { Client } from "pg";

const app = express();

const pgClient = new Client({
    user: "neondb_owner",
    password: "Write the Password Here",
    port: 5412,
    host: "Write the Host Data Here",
    database: "neondb"
})

async function main() {
    await pgClient.connect();
    const response = await pgClient.query("SELECT * FROM users;")
    const response2 = await pgClient.query("UPDATE users SET usernamr='ansh' WHERE id = 12")
    console.log(response);
    console.log(response.rows);
}
main()

function express() {
    throw new Error("Function not implemented.");
}




/* ===== TODO APP =====


// Import Express framework for creating web server
import express from "express";
// Import pg library to connect to PostgreSQL database
import { Client } from "pg";

// Create an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Create a PostgreSQL client to connect to the database
const pgClient = new Client({
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
        const response = await pgClient.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
            [username, email, password]
        );

        // Send success response with the newly created user's ID
        res.json({
            message: "You Have Signed Up Successfully",
            userId: response.rows[0].id
        });
    } catch (error) {
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

*/