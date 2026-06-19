// Express module ko import kar rahe ho
const express = require('express')

/**
 * Lightweight TODO API (in-memory)
 * - Clear, well-structured demo server
 * - Endpoints: GET /todos, POST /todos, PUT /todos/:id, DELETE /todos/:id
 */

// Express app banate ho
const app = express()
// JSON middleware
app.use(express.json())

// In-memory store (demo only) - todos yahan store hogi
// Next ID ka counter
let nextId = 3
// Todos array - initial todos
const todos = [
	// Todo 1 - Node.js seekhna
	{ id: 1, task: 'Learn Node.js', done: false },
	// Todo 2 - Arrow Functions practice
	{ id: 2, task: 'Practice Arrow Functions', done: false }
]

// Helpers - todo index find karne ke liye
const findIndex = id => todos.findIndex(t => t.id === id)

// Task validation function - task valid hai ya nahi check karta hai
const validateTask = (task) => typeof task === 'string' && task.trim().length > 0

// Routes
// GET - sabhi todos dekho
app.get('/todos', (req, res) => res.json(todos))

// POST - naya todo add kar do
app.post('/todos', (req, res) => {
	// Request body se task nikaal rahe ho
	const { task } = req.body
	// Agar task valid nahi hai to error send kar rahe ho
	if (!validateTask(task)) return res.status(400).json({ error: 'Task is required and must be a non-empty string' })
	// Naya todo object banate ho
	const todo = { id: nextId++, task: task.trim(), done: false }
	// Todo ko array mein add kar rahe ho
	todos.push(todo)
	// Naya todo return kar rahe ho
	return res.status(201).json(todo)
})

// PUT - existing todo ko update kar do
app.put('/todos/:id', (req, res) => {
	// URL parameter se id nikaal rahe ho aur number mein convert kar rahe ho
	const id = Number(req.params.id)
	// Agar id valid nahi hai to error send kar rahe ho
	if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
	// Todo ki index nikaal rahe ho
	const idx = findIndex(id)
	// Agar todo nahi mila to error send kar rahe ho
	if (idx === -1) return res.status(404).json({ error: 'Todo not found' })

	// Request body se task aur done nikaal rahe ho
	const { task, done } = req.body
	// Agar task update karna hai
	if (task !== undefined) {
		// Task valid check kar rahe ho
		if (!validateTask(task)) return res.status(400).json({ error: 'Task must be a non-empty string' })
		// Todo ka task update kar rahe ho
		todos[idx].task = task.trim()
	}
	// Agar done update karna hai
	if (done !== undefined) todos[idx].done = Boolean(done)

	// Updated todo return kar rahe ho
	return res.json(todos[idx])
})

// DELETE - todo ko delete kar do
app.delete('/todos/:id', (req, res) => {
	// URL parameter se id nikaal rahe ho
	const id = Number(req.params.id)
	// Agar id valid nahi hai to error send kar rahe ho
	if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
	// Todo ki index nikaal rahe ho
	const idx = findIndex(id)
	// Agar todo nahi mila to error send kar rahe ho
	if (idx === -1) return res.status(404).json({ error: 'Todo not found' })
	// Todo ko array se remove kar rahe ho
	todos.splice(idx, 1)
	// Success message return kar rahe ho
	return res.json({ message: 'Todo deleted' })
})

// Error handler
app.use((err, req, res, next) => {
	// keep error handling minimal for demo
	// eslint-disable-next-line no-console
	console.error(err)
	res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


