const express = require('express');
const app = express();
const port = 3000;

let goodFruitsCount = 0;
let badFruitsCount = 0;

app.use(express.json());

app.get('/fruit-counts', (req, res) => {
  res.json({
    badFruits: badFruitsCount,
    goodFruits: goodFruitsCount,
  });
});

app.post('/increase-good', (req, res) => {
  goodFruitsCount++;
  res.json({ message: 'Good Fruit count increased!', goodFruits: goodFruitsCount });
});

app.post('/decrease-good', (req, res) => {
  if (goodFruitsCount > 0) {
    goodFruitsCount--;
    res.json({ message: 'Good fruit count decreased!', goodFruits: goodFruitsCount });
  } else {
    res.status(400).json({ message: 'Cannot decrease, the count is already 0!' });
  }
});

app.post('/increase-bad', (req, res) => {
  badFruitsCount++;
  res.json({ message: 'Bad fruit count increased!', badFruits: badFruitsCount });
});

app.post('/decrease-bad', (req, res) => {
  if (badFruitsCount > 0) {
    badFruitsCount--;
    res.json({ message: 'Bad fruit count decreased!', badFruits: badFruitsCount });
  } else {
    res.status(400).json({ message: 'Cannot decrease, the count is already 0!' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// vegetable

//vegetable

//vegetable