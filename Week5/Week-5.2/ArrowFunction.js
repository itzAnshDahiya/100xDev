const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node.js", done: false },
  { id: 2, task: "Practice Arrow Functions", done: false }
];

// GET all todos
app.get('/todos', (req, res) => res.json(todos));

// POST a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ msg: "Task is required" });
  const newTodo = { id: Date.now(), task, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo by id
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, done } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ msg: "Todo not found" });
  if (task !== undefined) todo.task = task;
  if (done !== undefined) todo.done = done;
  res.json(todo);
});

// DELETE a todo by id
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length === initialLength) return res.status(404).json({ msg: "Todo not found" });
  res.json({ msg: "Todo deleted" });
});

app.listen(3000, () => console.log('Server running on port 3000'));