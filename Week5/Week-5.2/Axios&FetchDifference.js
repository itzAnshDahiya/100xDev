// Axios vs Fetch - Difference explain kar rahe ho
/*  
// Function - Axios aur Fetch mein kya difference hai
function explainAxiosVsFetch() {
  // Multi-line string return kar rahe ho
  return `
1. Axios third-party library hai, Fetch built-in browser API hai
2. Axios JSON ko automatically transform karti hai, Fetch manual parsing chahiye
3. Axios mein request cancellation, interceptors, timeouts built-in hain
4. Axios browsers aur Node.js dono mein kaam karti hai
5. Axios JSON ko automatically serialize karti hai, Fetch mein JSON.stringify() manual karna padta hai
`;
}

// Function ko call kar rahe ho
console.log(explainAxiosVsFetch());

*/

// Function call kar rahe ho
console.log(explainAxiosVsFetch());

// Example: GET request using fetch - built-in API
fetch('https://jsonplaceholder.typicode.com/posts/1')
  // Response ko handle kar rahe ho
  .then(response => {
    // Agar response successful nahi hai to error throw kar rahe ho
    if (!response.ok) throw new Error('Network response was not ok');
    // Response ko JSON mein convert kar rahe ho
    return response.json();
  })
  // Data print kar rahe ho
  .then(data => console.log('Fetch GET:', data))
  // Error handle kar rahe ho
  .catch(error => console.error('Fetch Error:', error));

// Example: GET request using axios - third-party library
// Axios module ko require kar rahe ho
const axios = require('axios');
// Axios se GET request kar rahe ho
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  // Response handle kar rahe ho
  .then(response => {
    // Data print kar rahe ho
    console.log('Axios GET:', response.data);
  })
  // Error handle kar rahe ho
  .catch(error => {
    console.error('Axios Error:', error);
  });

// Example: POST request using fetch - manual setup
fetch('https://jsonplaceholder.typicode.com/posts', {
  // POST method
  method: 'POST',
  // Headers set kar rahe ho
  headers: { 'Content-Type': 'application/json' },
  // Body ko JSON string mein convert kar rahe ho
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
})
  // Response ko JSON mein convert kar rahe ho
  .then(response => response.json())
  // Data print kar rahe ho
  .then(data => console.log('Fetch POST:', data));

// Example: POST request using axios - simpler syntax
// Axios se POST request kar rahe ho
axios.post('https://jsonplaceholder.typicode.com/posts', {
  // Data directly pass kar sakte ho
  title: 'foo',
  body: 'bar',
  userId: 1
})
  // Response handle kar rahe ho
  .then(response => console.log('Axios POST:', response.data))
  .catch(error => console.error('Axios Error:', error));



 // -----------------------More structured code----------------------
//  function explainAxiosVsFetch() {
//   return `
// 1. Axios is a third-party HTTP client library, while fetch is a built-in browser API (also available in Node.js from v18).
// 2. Axios automatically transforms JSON data and handles errors more intuitively; fetch requires manual parsing with .json() and does not throw errors for HTTP error status codes.
// 3. Axios supports request cancellation, interceptors, and automatic timeouts; fetch requires more manual setup for these features.
// 4. Axios works in both browsers and Node.js (all versions); fetch is native in browsers and Node.js v18+.
// 5. Axios automatically serializes JavaScript objects to JSON for POST requests; fetch requires manual serialization with JSON.stringify().
// `;
// }

// console.log(explainAxiosVsFetch());

// const axios = require('axios');

// // Example: GET request using fetch
// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then(response => {
//     if (!response.ok) throw new Error('Network response was not ok');
//     return response.json();
//   })
//   .then(data => console.log('Fetch GET:', data))
//   .catch(error => console.error('Fetch Error:', error));

// // Example: GET request using axios
// axios.get('https://jsonplaceholder.typicode.com/posts/1')
//   .then(response => {
//     console.log('Axios GET:', response.data);
//   })
//   .catch(error => {
//     console.error('Axios Error:', error);
//   });

// // Example: POST request using fetch
// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
// })
//   .then(response => response.json())
//   .then(data => console.log('Fetch POST:', data))
//   .catch(error => console.error('Fetch POST Error:', error));

// // Example: POST request using axios
// axios.post('https://jsonplaceholder.typicode.com/posts', {
//   title: 'foo',
//   body: 'bar',
//   userId: 1
// })
//   .then(response => console.log('Axios POST:', response.data))
//   .catch(error => console.error('Axios POST Error:', error));
