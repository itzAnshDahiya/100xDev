const express = require('express');
const app = express();

function map(arr, transformFn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(transformFn(arr[i], i, arr));
  }
  return result;
}

// Example usage:
const numbers = [1, 2, 3, 4 ,5];
const doubled = map(numbers, x => x * 2);
console.log(doubled);