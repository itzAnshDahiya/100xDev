const express = require('express')

/**
 * Lightweight TODO API (in-memory)
 * - Clear, well-structured demo server
 * - Endpoints: GET /todos, POST /todos, PUT /todos/:id, DELETE /todos/:id
 */

const app = express()
app.use(express.json())

// In-memory store (demo only)
let nextId = 3
const todos = [
	{ id: 1, task: 'Learn Node.js', done: false },
	{ id: 2, task: 'Practice Arrow Functions', done: false }
]

// Helpers
const findIndex = id => todos.findIndex(t => t.id === id)

const validateTask = (task) => typeof task === 'string' && task.trim().length > 0

// Routes
app.get('/todos', (req, res) => res.json(todos))

app.post('/todos', (req, res) => {
	const { task } = req.body
	if (!validateTask(task)) return res.status(400).json({ error: 'Task is required and must be a non-empty string' })
	const todo = { id: nextId++, task: task.trim(), done: false }
	todos.push(todo)
	return res.status(201).json(todo)
})

app.put('/todos/:id', (req, res) => {
	const id = Number(req.params.id)
	if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
	const idx = findIndex(id)
	if (idx === -1) return res.status(404).json({ error: 'Todo not found' })

	const { task, done } = req.body
	if (task !== undefined) {
		if (!validateTask(task)) return res.status(400).json({ error: 'Task must be a non-empty string' })
		todos[idx].task = task.trim()
	}
	if (done !== undefined) todos[idx].done = Boolean(done)

	return res.json(todos[idx])
})

app.delete('/todos/:id', (req, res) => {
	const id = Number(req.params.id)
	if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
	const idx = findIndex(id)
	if (idx === -1) return res.status(404).json({ error: 'Todo not found' })
	todos.splice(idx, 1)
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


