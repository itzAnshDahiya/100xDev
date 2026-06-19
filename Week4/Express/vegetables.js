// Express module ko import kar rahe ho
const express = require('express');
// Express app banate ho
const app = express();
// Port number
const port = 3000;

// Good fruits ka count - initially 0
let goodFruitsCount = 0;
// Bad fruits ka count - initially 0
let badFruitsCount = 0;

// Express ko JSON data handle karne ke liye kahte ho
app.use(express.json());

// GET endpoint - fruit counts dekho
app.get('/fruit-counts', (req, res) => {
  // JSON response bhej rahe ho
  res.json({
    // Bad fruits count
    badFruits: badFruitsCount,
    // Good fruits count
    goodFruits: goodFruitsCount,
  });
});

// POST endpoint - good fruit count badha do
app.post('/increase-good', (req, res) => {
  // Good count ko increment kar rahe ho
  goodFruitsCount++;
  // Response bhej rahe ho
  res.json({ message: 'Good Fruit count increased!', goodFruits: goodFruitsCount });
});

// POST endpoint - good fruit count gha do
app.post('/decrease-good', (req, res) => {
  // Agar count 0 se zyada hai to
  if (goodFruitsCount > 0) {
    // Count ko decrement kar rahe ho
    goodFruitsCount--;
    // Response bhej rahe ho
    res.json({ message: 'Good fruit count decreased!', goodFruits: goodFruitsCount });
  } else {
    // Agar count already 0 hai to error response
    res.status(400).json({ message: 'Cannot decrease, the count is already 0!' });
  }
});

// POST endpoint - bad fruit count badha do
app.post('/increase-bad', (req, res) => {
  // Bad count ko increment kar rahe ho
  badFruitsCount++;
  // Response bhej rahe ho
  res.json({ message: 'Bad fruit count increased!', badFruits: badFruitsCount });
});

// POST endpoint - bad fruit count gha do
app.post('/decrease-bad', (req, res) => {
  // Agar count 0 se zyada hai to
  if (badFruitsCount > 0) {
    // Count ko decrement kar rahe ho
    badFruitsCount--;
    // Response bhej rahe ho
    res.json({ message: 'Bad fruit count decreased!', badFruits: badFruitsCount });
  } else {
    // Agar count already 0 hai to error response
    res.status(400).json({ message: 'Cannot decrease, the count is already 0!' });
  }
});

// Server ko port pe listen karte ho
app.listen(port, () => {
  // Server start hone ka message
  console.log(`Server is running on http://localhost:${port}`);
});

// Vegetable section (vegetables ke liye comments)

//vegetable

//vegetable