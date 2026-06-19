"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
// Connection string - NEVER MAKE THIS PUBLIC
const pool = new pg_1.Pool({
    connectionString: "postgresql://neondb_owner:npg_5AXnbWktNwm9@ep-odd-hall-a86hwjx8-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
});
pool.connect().then((conn) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // POST /signup - Register new user
    app.post("/signup", (req, res) => {
        const { username, password } = req.body;
        // Use parameterized queries to prevent SQL injection
        conn.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id", [username, password])
            .then((result) => {
            res.json({
                message: "User created",
                userId: result.rows[0].id
            });
        })
            .catch((err) => {
            res.status(400).json({
                message: "Signup failed",
                error: err.message
            });
        });
    });
    // POST /signin - Login user
    app.post("/signin", (req, res) => {
        const { username, password } = req.body;
        // Use parameterized queries for safety
        conn.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password])
            .then((result) => {
            const rows = result.rows;
            if (rows.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const userId = rows[0].id;
            const token = jsonwebtoken_1.default.sign({ userId }, "123random");
            res.json({ token });
        })
            .catch((err) => {
            res.status(500).json({ message: "Signin failed", error: err.message });
        });
    });
    // POST /todos - Create new todo/blog
    app.post("/todos", (req, res) => {
        try {
            const token = req.headers.token;
            const decoded = jsonwebtoken_1.default.verify(token, "123random");
            const userId = decoded.userId;
            const { title, content } = req.body;
            conn.query("INSERT INTO blogs (title, content, user_id) VALUES ($1, $2, $3) RETURNING id", [title, content, userId])
                .then((result) => {
                res.json({
                    message: "Todo inserted",
                    todoId: result.rows[0].id
                });
            })
                .catch((err) => {
                res.status(500).json({ message: "Failed to insert todo", error: err.message });
            });
        }
        catch (err) {
            res.status(401).json({ message: "Invalid token", error: err.message });
        }
    });
    // GET /todos - Fetch user's todos
    app.get("/todos", (req, res) => {
        try {
            const token = req.headers.token;
            const decoded = jsonwebtoken_1.default.verify(token, "123random");
            const userId = decoded.userId;
            conn.query("SELECT * FROM blogs WHERE user_id = $1", [userId])
                .then((result) => {
                res.json({
                    todos: result.rows
                });
            })
                .catch((err) => {
                res.status(500).json({ message: "Failed to fetch todos", error: err.message });
            });
        }
        catch (err) {
            res.status(401).json({ message: "Invalid token", error: err.message });
        }
    });
    // Start server
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}).catch((err) => {
    console.error("Database connection failed:", err);
});
//# sourceMappingURL=index.js.map