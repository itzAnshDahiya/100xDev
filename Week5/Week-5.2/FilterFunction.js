// Express module ko import kar rahe ho
const express = require('express');
// Express app banate ho
const app = express();

// Filter function - array par loop karta hai aur condition check karta hai
function filter(arr, predicateFn) {
  // Empty result array - filtered items here jayengi
  const result = [];
  // Array ke har element pe loop
  for (let i = 0; i < arr.length; i++) {
    // Predicate function ko call kar rahe ho (condition check)
    if (predicateFn(arr[i], i, arr)) {
      // Agar condition true hai to element ko result mein add kar rahe ho
      result.push(arr[i]);
    }
  }
  // Filtered array return kar rahe ho
  return result;
}

// Example usage:
// Numbers array
const numbers = [1, 2, 3, 4, 5];
// Filter function se even numbers nikaal rahe ho (x % 2 === 0 means even)
const evenNumbers = filter(numbers, x => x % 2 === 0);