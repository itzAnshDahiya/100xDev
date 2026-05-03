// Express module ko import kar rahe ho
const express = require('express');
// Express app banate ho
const app = express();

// JSON data parse karne ke liye middleware
app.use(express.json());
// Initially tasks array empty
let tasks = [];

// GET endpoint - sabhi tasks dekho
app.get('/tasks', (req, res) => {
    // Sabhi tasks return kar rahe ho JSON mein
    res.json(tasks);
});


// POST endpoint - naya task add kar do
app.post('/tasks', (req, res) => {
    // Request body se text nikaal rahe ho
    const { text } = req.body;
    // Agar text nahi hai to error
    if (!text) {
        // 400 error response
        return res.status(400).json({ error: 'Task text is required' });
    }
    // Naya task object banate ho
    const newTask = {
        // ID = purane tasks ki length + 1
        id: tasks.length + 1,
        // Text ko set kar rahe ho
        text,
        // Initially task incomplete
        completed: false,
    };
    // Task ko array mein push kar rahe ho
    tasks.push(newTask);
    // 201 status se naya task return kar rahe ho
    res.status(201).json(newTask);
});

// PUT endpoint - task ko complete mark kar do
app.put('/tasks/:id', (req, res) => {
    // URL parameter se id nikaal rahe ho aur integer mein convert kar rahe ho
    const taskId = parseInt(req.params.id);
    // Array mein task ko search kar rahe ho
    const task = tasks.find((t) => t.id === taskId);
    // Agar task nahi mila
    if (!task) {
        // 404 error response
        return res.status(404).json({ error: 'Task not found' });
    }
    // Task ko complete mark kar rahe ho
    task.completed = true;
    // Updated task return kar rahe ho
    res.json(task);
});

// DELETE endpoint - task ko delete kar do
app.delete('/tasks/:id', (req, res) => {
    // URL parameter se id nikaal rahe ho
    const taskId = parseInt(req.params.id);
    // Array mein task ki index search kar rahe ho
    const index = tasks.findIndex((t) => t.id === taskId);
    // Agar task nahi mila
    if (index === -1) {
        // 404 error response
        return res.status(404).json({ error: 'Task not found' });
    }
    // Task ko array se remove kar rahe ho
    tasks.splice(index, 1);
    // 204 (No Content) response
    res.status(204).end();
});

// Port number
const PORT = 3005;
// Server ko port pe listen karte ho
app.listen(PORT, () => {
    // Server start hone ka message
    console.log(`Server running on port ${PORT}`);
});