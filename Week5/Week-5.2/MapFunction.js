// Express module ko import kar rahe ho
const express = require('express');
// Express app banate ho
const app = express();

// Map function - array ke har element pe transform apply karti hai
function map(arr, transformFn) {
  // Empty result array - transformed items here jayengi
  const result = [];
  // Array ke har element pe loop
  for (let i = 0; i < arr.length; i++) {
    // Transform function ko call kar rahe ho aur result mein push kar rahe ho
    result.push(transformFn(arr[i], i, arr));
  }
  // Transformed array return kar rahe ho
  return result;
}

// Example usage:
// Numbers array
const numbers = [1, 2, 3, 4 ,5];
// Map function se har number ko double kar rahe ho (x * 2)
const doubled = map(numbers, x => x * 2);
// Doubled array print kar rahe ho
console.log(doubled);