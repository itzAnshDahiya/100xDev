const express = require('express');
const app = express();

function filter(arr, predicateFn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicateFn(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers, x => x % 2 === 0);